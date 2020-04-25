const { fields } = require('../../src/db/schemas/fields/convertingMessage')

module.exports = {
  up: queryInterface => queryInterface.createTable('convertingMessage', {
    ...fields,
  }),

  down: queryInterface => queryInterface.dropTable('convertingMessage'),
}
