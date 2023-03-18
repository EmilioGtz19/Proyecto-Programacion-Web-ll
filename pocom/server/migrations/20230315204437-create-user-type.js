'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_type_description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    return queryInterface.bulkInsert('user_type',[
      {
        user_type_description: 'Administrador',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_type_description: 'Usuario',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_type');
  }
};