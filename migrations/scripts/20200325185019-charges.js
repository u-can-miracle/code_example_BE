const { fields } = require('../../src/db/schemas/fields/charge')

module.exports = {
  up: queryInterface => queryInterface.createTable('charge', {
    ...fields,
  }),

  down: queryInterface => queryInterface.dropTable('charge'),
}
