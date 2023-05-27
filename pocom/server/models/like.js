'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      like.belongsTo(models.user,
        {
          as: 'FK_like_user',
          foreignKey: 'user_id'
        }
      )

      like.belongsTo(models.posts,
          {
            as: 'FK_like_post',
            foreignKey: 'post_id'
          }
        )
    }
  }
  like.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    post_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT
    }
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};