'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
      User.hasMany(models.Comment)
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Username is required"
        },
        notNull:{
          args: true,
          msg: "Username is required"
        },
        isAlphanumeric:{
          args: true,
          msg: "Username can only contain Alphanumeric"
        },
        len:{
          args: [4, 16],
          msg: "Username can only contains 4 to 16 characters"
        }
      }
      
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        notNull:{
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "The email format you're inputting is invalid"
        }
      }

    },
    
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
        notNull:{
          args: true,
          msg: "Password is required"
        },
        is: {
          args: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          msg: "Password minimum 8 characters and at least contains one letter and one number"
        }
      }

    },

    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(user.password, salt);

    user.password = hashedPass;
    user.isAdmin = false;
  })

  User.beforeUpdate((user, option) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(user.password, salt);

    user.password = hashedPass;
  })

  return User;
};