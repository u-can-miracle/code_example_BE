module.exports = {
  up: queryInterface => queryInterface.bulkInsert('productImg', [
    // Koltuk
    {
      // id: 1,
      originalname: 'Koltuk1.png',
      mimetype: 'image/png',
      // eslint-disable-next-line
			location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569069026084-Koltuk1.png',
      key: '1/1569069026084-Koltuk1.png',
      productId: 1,
    },
    {
      // id: 2,
      originalname: 'Koltuk2.png',
      mimetype: 'image/png',
      // eslint-disable-next-line
			location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569069039017-Koltuk2.png',
      key: '1/1569069039017-Koltuk2.png',
      productId: 1,
    },

    // coffe table
    {
      // id: 3,
      originalname: 'coffee-table.png',
      mimetype: 'image/png',
      // eslint-disable-next-line
			location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569076086733-coffee-table.png',
      key: '1/1569076086733-coffee-table.png',
      productId: 2,
    },

    // Bed With Thyme prodId = 3
    {
      // id: 4,
      originalname: 'California King Size Bed Covered With Thyme.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569077924714-California%20King%20Size%20Bed%20Covered%20With%20Thyme.jpg',
      key: '1/1569077924714-California King Size Bed Covered With Thyme.jpg',
      productId: 3,
    },

    // Full Size Bed With White Sheets prodId = 4
    {
      // id: 5,
      originalname: 'Full Size Bed With White Sheets.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569078877178-Full%20Size%20Bed%20With%20White%20Sheets.jpg',
      key: '1/1569078877178-Full Size Bed With White Sheets.jpg',
      productId: 4,
    },

    // Bed With Thyme prodId = 5
    {
      // id: 6,
      originalname: 'California King Size Bed Covered With Thyme.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569077924714-California%20King%20Size%20Bed%20Covered%20With%20Thyme.jpg',
      key: '1/1569077924714-California King Size Bed Covered With Thyme.jpg',
      productId: 5,
    },

    // Full Size Bed With White Sheets prodId = 6
    {
      // id: 7,
      originalname: 'Full Size Bed With White Sheets.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569078877178-Full%20Size%20Bed%20With%20White%20Sheets.jpg',
      key: '1/1569078877178-Full Size Bed With White Sheets.jpg',
      productId: 6,
    },

    // Bed With Thyme prodId = 7
    {
      // id: 8,
      originalname: 'California King Size Bed Covered With Thyme.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569077924714-California%20King%20Size%20Bed%20Covered%20With%20Thyme.jpg',
      key: '1/1569077924714-California King Size Bed Covered With Thyme.jpg',
      productId: 7,
    },

    // Full Size Bed With White Sheets prodId = 8
    {
      // id: 9,
      originalname: 'Full Size Bed With White Sheets.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569078877178-Full%20Size%20Bed%20With%20White%20Sheets.jpg',
      key: '1/1569078877178-Full Size Bed With White Sheets.jpg',
      productId: 8,
    },

    // Bed With Thyme prodId = 9
    {
      // id: 10,
      originalname: 'California King Size Bed Covered With Thyme.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569077924714-California%20King%20Size%20Bed%20Covered%20With%20Thyme.jpg',
      key: '1/1569077924714-California King Size Bed Covered With Thyme.jpg',
      productId: 9,
    },

    // Full Size Bed With White Sheets prodId = 10
    {
      // id: 11,
      originalname: 'Full Size Bed With White Sheets.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569078877178-Full%20Size%20Bed%20With%20White%20Sheets.jpg',
      key: '1/1569078877178-Full Size Bed With White Sheets.jpg',
      productId: 10,
    },

    // Bed With Thyme prodId = 11
    {
      // id: 12,
      originalname: 'California King Size Bed Covered With Thyme.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569077924714-California%20King%20Size%20Bed%20Covered%20With%20Thyme.jpg',
      key: '1/1569077924714-California King Size Bed Covered With Thyme.jpg',
      productId: 11,
    },

    // Full Size Bed With White Sheets prodId = 12
    {
      // id: 13,
      originalname: 'Full Size Bed With White Sheets.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569078877178-Full%20Size%20Bed%20With%20White%20Sheets.jpg',
      key: '1/1569078877178-Full Size Bed With White Sheets.jpg',
      productId: 12,
    },

    // Bed With Thyme prodId = 13
    {
      // id: 14,
      originalname: 'California King Size Bed Covered With Thyme.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569077924714-California%20King%20Size%20Bed%20Covered%20With%20Thyme.jpg',
      key: '1/1569077924714-California King Size Bed Covered With Thyme.jpg',
      productId: 13,
    },


    // Full Size Bed With White Sheets prodId = 14
    {
      // id: 15,
      originalname: 'Full Size Bed With White Sheets.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569078877178-Full%20Size%20Bed%20With%20White%20Sheets.jpg',
      key: '1/1569078877178-Full Size Bed With White Sheets.jpg',
      productId: 14,
    },

    // Bed With Thyme prodId = 15
    {
      // id: 16,
      originalname: 'California King Size Bed Covered With Thyme.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569077924714-California%20King%20Size%20Bed%20Covered%20With%20Thyme.jpg',
      key: '1/1569077924714-California King Size Bed Covered With Thyme.jpg',
      productId: 15,
    },


    // Full Size Bed With White Sheets prodId = 16
    {
      // id: 17,
      originalname: 'Full Size Bed With White Sheets.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569078877178-Full%20Size%20Bed%20With%20White%20Sheets.jpg',
      key: '1/1569078877178-Full Size Bed With White Sheets.jpg',
      productId: 16,
    },
    // Bed With Thyme prodId = 17
    {
      // id: 18,
      originalname: 'California King Size Bed Covered With Thyme.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569077924714-California%20King%20Size%20Bed%20Covered%20With%20Thyme.jpg',
      key: '1/1569077924714-California King Size Bed Covered With Thyme.jpg',
      productId: 17,
    },


    // Full Size Bed With White Sheets prodId = 18
    {
      // id: 19,
      originalname: 'Full Size Bed With White Sheets.jpg',
      mimetype: 'image/jpeg',
      // eslint-disable-next-line
      location: 'https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1569078877178-Full%20Size%20Bed%20With%20White%20Sheets.jpg',
      key: '1/1569078877178-Full Size Bed With White Sheets.jpg',
      productId: 18,
    },
  ]),

  down: queryInterface => queryInterface.bulkDelete('productImg', null, {}),
}
