'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'links',
      [
        {
          ku1live: 'https://www.youtube.com/watch?v=XqZsoesa55w',
          ku2live: 'https://www.youtube.com/watch?v=XqZsoesa55w',
          ku5live: 'https://www.youtube.com/watch?v=XqZsoesa55w',
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Add more rows as needed
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('links', null, {});
  },
};