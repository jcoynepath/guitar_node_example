module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'nodenext',
          target: 'esnext',
        },
        useESM: true,
      },
    ],
  },
  testRegex: '/.*.test.ts$',
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  moduleNameMapper: {
    '^(..?/.+).js$': '$1',
  },
};
