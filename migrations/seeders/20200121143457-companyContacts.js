module.exports = {
  up: queryInterface => queryInterface.bulkInsert('companyContacts', [
    {
      // id: 1,
      companyId: 1,
      country: 'Ukraine',
      city: 'Kiev',
    },
    {
      // id: 2,
      companyId: 2,
      country: 'Ukraine',
      city: 'Dnipropetrovsk',
    },
    {
      // id: 3,
      companyId: 3,
      country: 'Ukraine',
      city: 'Dnipropetrovsk',
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('companyContacts', null, {}),
}
