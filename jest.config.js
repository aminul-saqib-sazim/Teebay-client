/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
  },

  transform: {
    "^.+\\.(spec|test).tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },

  maxWorkers: process.env.CI ? "50%" : "75%",
  cache: true,
  cacheDirectory: "<rootDir>/.jest-cache",
  testTimeout: 10000,
};
