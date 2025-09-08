export default {
  transform: {},
  testEnvironment: 'node',
  moduleNameMapper: {
    '^helmet$': 'helmet',
    '^express-rate-limit$': 'express-rate-limit',
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};