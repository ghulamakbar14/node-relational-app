'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
    await queryInterface.renameColumn('Posts', 'image_url', 'imageUrl');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     **/
    await queryInterface.renameColumn('Posts', 'imageUrl', 'image_url');
  }
};
