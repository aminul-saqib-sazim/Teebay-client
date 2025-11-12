/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
  },

  maxWorkers: process.env.CI ? "50%" : "75%",
  cache: true,
  cacheDirectory: "<rootDir>/.jest-cache",
  testTimeout: 10000,

  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: {
        jsx: "react",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    },
  },
};
