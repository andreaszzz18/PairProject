'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    get ageGenerator(){
      if(this.dateOfBirth){
        return new Date().getFullYear() - this.dateOfBirth.getFullYear()
      }
    }


  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
        notNull:{
          args: true,
          msg: "Name is required"
        },
        is:{
          args: /^[a-zA-Z ]*$/, 
          msg: "Can only contain Alphabet and Space"
        }
      }
    },
    
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Date of Birth is required"
        },
        notNull:{
          args: true,
          msg: "Date of Birth is required"
        },
        ageValidator(){
          if(this.ageGenerator < 13){
            throw new Error('Only 13 and above can register!');
          }
        }
      }
    },
    
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Gender is required"
        },
        notNull:{
          args: true,
          msg: "Gender is required"
        },
        isIn:{
          args: [['Male', 'Female']],
          msg: "Gender can only be Male and Female"
        }
      }

    },
    
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: "Image is required"
        },
        notNull:{
          args: true,
          msg: "Image is required"
        },
        imageValidate(value){
          const fileType = value[value.length-3] + value[value.length-2] + value[value.length-1]  

          if(fileType !== "png" && fileType !== "jpg"){
            throw new Error('Only png and jpg allowed')
          }

          
        }
      }
    },


    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};