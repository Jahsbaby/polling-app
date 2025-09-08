export default {
  transform: {},
  testEnvironment: 'node',
  transformIgnorePatterns: [
    '/node_modules/(?!helmet|express-rate-limit)/'
  ],
  moduleFileExtensions: ['js', 'json', 'node'],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};
