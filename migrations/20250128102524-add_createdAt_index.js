'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Add index for the `createdAt` column
    await queryInterface.addIndex('products', ['createdAt']);
  },

  async down(queryInterface, Sequelize) {
    // Remove the index for the `createdAt` column
    await queryInterface.removeIndex('products', ['createdAt']);
  }
};

