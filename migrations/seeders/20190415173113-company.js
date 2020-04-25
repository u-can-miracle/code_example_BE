module.exports = {
  up: queryInterface => queryInterface.bulkInsert('company', [{
    // id: 1,
    name: 'company 1',
  }, {
    // id: 2,
    name: 'comp',
  }, {
    // id: 3,
    name: 'freeComp',
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('company', null, {}),
}
