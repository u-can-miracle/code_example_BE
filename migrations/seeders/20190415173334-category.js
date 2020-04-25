module.exports = {
  up: queryInterface => queryInterface.bulkInsert('category', [
    {
      // id: 1,
      name: 'Домашняя мебель',
      companyId: 3,
      userId: 3,
      parentCategoryId: null,
    },
    {
      // id: 2,
      name: 'Спальня',
      companyId: 3,
      userId: 3,
      parentCategoryId: 1,
    },
    {
      // id: 3,
      name: 'Зала',
      companyId: 3,
      userId: 3,
      parentCategoryId: 1,
    },
    {
      // id: 4,
      name: 'Спальня детская',
      companyId: 3,
      userId: 3,
      parentCategoryId: 2,
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('category', null, {}),
}
