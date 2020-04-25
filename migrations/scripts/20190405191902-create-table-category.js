const { fields } = require('../../src/db/schemas/fields/category')

module.exports = {
  up: queryInterface => queryInterface.createTable('category', {
    ...fields,
  })
    .then(() => queryInterface.addConstraint(
      'category',
      ['parentCategoryId'],
      {
        type: 'foreign key',
        references: {
          table: 'category',
          field: 'id',
        },
      },
    )),

  down: queryInterface => queryInterface.dropTable('category'),
}
