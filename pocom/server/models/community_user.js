'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class community_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      community_user.belongsTo(models.user,
        {
          as: 'FK_community_user_user_type',
          foreignKey: 'user_id'
        }
      )

      community_user.belongsTo(models.community,
        {
          as: 'FK_community_user_community',
          foreignKey: 'community_id'
        }
      )

    }
  }
  community_user.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'communities',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'community_user',
    primaryKey: ['user_id', 'community_id'],
    unique: true
  });
  return community_user;
};