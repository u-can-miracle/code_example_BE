const { fields } = require('../../src/db/schemas/fields/companyContacts')

module.exports = {
  up: queryInterface => queryInterface.createTable('companyContacts', {
    ...fields,
  }),

  down: queryInterface => queryInterface.dropTable('companyContacts'),
}
