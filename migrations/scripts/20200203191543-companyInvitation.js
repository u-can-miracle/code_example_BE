const { fields } = require('../../src/db/schemas/fields/companyInvitation')

module.exports = {
  up: queryInterface => queryInterface.createTable('companyInvitation', {
    ...fields,
  }),

  down: queryInterface => queryInterface.dropTable('companyInvitation'),
}
