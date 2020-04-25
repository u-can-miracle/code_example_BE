const { fields } = require('../../src/db/schemas/fields/productImg')

module.exports = {
  up: queryInterface => queryInterface.createTable('productImg', {
    ...fields,
  })
    .then(() => queryInterface.addConstraint(
      'productImg',
      ['productId'],
      {
        type: 'foreign key',
        references: {
          table: 'product',
          field: 'id',
        },
      },
    )),

  down: queryInterface => queryInterface.dropTable('productImg'),
}
