'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Mentors', [{
      fullname: 'Ziya Meiramova',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullname: 'Dinmukhamed Tleuzhanuly',
      createdAt: new Date(),
      updatedAt: new Date()    
    },
    {
      fullname: 'Almas Abdugaliyev',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullname:'Yelnur Seitzhanov',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullname:'Nurailim Khudaibergenkyzy',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Mentors', null, {});
  }
};
