const { fields } = require('../../src/db/schemas/fields/userType')

module.exports = {
  up: queryInterface => queryInterface.createTable('userType', {
    ...fields,
  }),

  down: queryInterface => queryInterface.dropTable('userType'),
}
