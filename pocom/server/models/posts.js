'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts.belongsTo(models.community,
        {
          as: 'FK_post_community',
          foreignKey: 'community_id'
        }
      )

      posts.belongsTo(models.user,
        {
          as: 'FK_post_user',
          foreignKey: 'user_id'
        }
      )

    }
  }
  posts.init({
    id: {
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title:{
      allowNull: false,
      type: DataTypes.STRING
    },
    content:{
      allowNull: false,
      type: DataTypes.STRING
    },
    photo:{
      allowNull: true,
      type: DataTypes.STRING
    },
    community_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'communities',
        key: 'id'
      }
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};