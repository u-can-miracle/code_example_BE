module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: '',
  clearMocks: true,
  roots: [
    '<rootDir>',
  ],
  restoreMocks: true,
  rootDir: '../',
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  testRegex: 'tests/units/.*\\.ts$',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
}
