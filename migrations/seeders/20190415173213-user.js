const { ADMIN, MEMBER } = require('../../src/db/schemas/constants/roles')

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('user', [
    {
      // id: 1,
      name: 'User company 1',
      email: 'usercomp1@mail.com',
      // pwd - 12345
      password: '$2b$10$0eW0iqxK47uNA299PbBm8.1bCAA0/2ogkjwf95HfSHW1cfNvGGGJu',
      userTypeId: 1,
      isVerified: true,
      role: ADMIN,
    },
    {
      // id: 2,
      name: 'nick',
      email: 'cloudsmoonlight@gmail.com',
      // pwd - 12345
      password: '$2b$10$EyulMItozt0Ut.bN15S8aO5wpe6Pyptb1wfwhguZ2BtwuiVHD.eMO',
      userTypeId: 1,
      isVerified: true,
      companyId: 2,
      role: ADMIN,
    },
    {
      // id: 3,
      name: 'nick',
      email: 'freenickweb@gmail.com',
      // pwd - 12345
      password: '$2b$10$EyulMItozt0Ut.bN15S8aO5wpe6Pyptb1wfwhguZ2BtwuiVHD.eMO',
      userTypeId: 1,
      isVerified: true,
      companyId: 3,
      role: ADMIN,
    },
    {
      // id: 4,
      name: 'appearancenick',
      email: 'appearancenick@gmail.com',
      // pwd - 12345
      password: '$2b$10$EyulMItozt0Ut.bN15S8aO5wpe6Pyptb1wfwhguZ2BtwuiVHD.eMO',
      userTypeId: 1,
      isVerified: true,
      companyId: 3,
      role: MEMBER,
    },
    {
      // id: 5,
      name: 'appearancenick1',
      email: 'appearancenick1@gmail.com',
      // pwd - 12345
      password: '$2b$10$EyulMItozt0Ut.bN15S8aO5wpe6Pyptb1wfwhguZ2BtwuiVHD.eMO',
      userTypeId: 1,
      isVerified: true,
      companyId: 3,
      role: MEMBER,
    },
    {
      // id: 6,
      name: 'appearancenick2',
      email: 'appearancenick2@gmail.com',
      // pwd - 12345
      password: '$2b$10$EyulMItozt0Ut.bN15S8aO5wpe6Pyptb1wfwhguZ2BtwuiVHD.eMO',
      userTypeId: 1,
      isVerified: true,
      companyId: 3,
      role: MEMBER,
    },
    {
      // id: 7,
      name: 'appearancenick3',
      email: 'appearancenick3@gmail.com',
      // pwd - 12345
      password: '$2b$10$EyulMItozt0Ut.bN15S8aO5wpe6Pyptb1wfwhguZ2BtwuiVHD.eMO',
      userTypeId: 1,
      isVerified: true,
      companyId: 3,
      role: MEMBER,
    },
    {
      // id: 7,
      name: 'appearancenick4',
      email: 'appearancenick4@gmail.com',
      // pwd - 12345
      password: '$2b$10$EyulMItozt0Ut.bN15S8aO5wpe6Pyptb1wfwhguZ2BtwuiVHD.eMO',
      userTypeId: 1,
      isVerified: true,
      companyId: 3,
      role: MEMBER,
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('user', null, {}),
}
