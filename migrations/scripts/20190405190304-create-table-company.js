const { fields } = require('../../src/db/schemas/fields/company')

module.exports = {
  up: queryInterface => queryInterface.createTable('company', {
    ...fields,
  }),

  down: queryInterface => queryInterface.dropTable('company'),
}
