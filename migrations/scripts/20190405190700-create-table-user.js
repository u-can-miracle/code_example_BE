const { fields } = require('../../src/db/schemas/fields/user')

module.exports = {
  up: queryInterface => queryInterface.createTable('user', {
    ...fields,
  })
    .then(() => queryInterface.addConstraint(
      'user',
      ['companyId'],
      {
        type: 'foreign key',
        references: {
          table: 'company',
          field: 'id',
        },
      },
    ))
    .then(() => queryInterface.addConstraint(
      'user',
      ['userTypeId'],
      {
        type: 'foreign key',
        references: {
          table: 'userType',
          field: 'id',
        },
      },
    )),

  down: queryInterface => queryInterface.dropTable('user'),
}
