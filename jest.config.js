module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
    },
  },
  automock: false,
  cacheDirectory: '<rootDir>/.jest',
  collectCoverage: true,
  roots: ['src'],
  collectCoverageFrom: ['**/src/*.ts', '!src/index.ts'],
  coverageThreshold: {
    global: {
      branches: 66,
      functions: 100,
      lines: 88,
      statements: 90,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/scripts/', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
