/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('locations', [{
    name: 'Kigali',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'New York',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Lagos',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Dubai',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Kinshasa',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Johanesburg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ], {});
}

/* eslint-disable no-unused-vars */
export function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('locations', null, {});
}
