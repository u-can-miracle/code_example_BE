const { VENDOR, CUSTOMER } = require('../../src/constants/user')

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('userType', [{
    type: VENDOR,
  }, {
    type: CUSTOMER,
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('userType', null, {}),
}
