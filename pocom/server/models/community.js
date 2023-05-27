'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      community.belongsTo(models.user,
        {
          as: 'FK_community_user',
          foreignKey: 'user_id'
        }
      )
      
    }
  }
  community.init({
    community_name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    community_photo: {
      allowNull: true,
      type: DataTypes.STRING
    },
    community_description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    followers: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    publications: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    comments: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'community',
  });
  return community;
};