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
    await queryInterface.bulkInsert('Courses', [{
      name: 'WebDev',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Python',
      createdAt: new Date(),
      updatedAt: new Date()    
    },
    {
      name: 'SQL',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'C++',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'IT гений',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Unity',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'JavaSE',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Data Analitycs',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'React',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Android',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'NodeJS',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Django',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'IOS',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Комп граммотность',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Go',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Courses', null, {});
  }
};
