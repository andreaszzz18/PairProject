'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.hasMany(models.Comment)
    }

    static findAllWithAllAssosiate(){
      return this.findAll({
        include: {
          all: true,
          nested: true
      }
    })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    caption: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};