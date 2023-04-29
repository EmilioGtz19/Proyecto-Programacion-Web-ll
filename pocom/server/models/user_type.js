'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_type.init({
    id : {
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_type_description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT
    }
  }, {
    sequelize,
    modelName: 'user_type',
  });
  return user_type;
};