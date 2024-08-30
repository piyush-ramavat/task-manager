module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testMatch: ["**/?(*.)+(spec|test).ts"],
  testTimeout: 60000,
  silent: true,
  verbose: true,
  bail: true,
  workerIdleMemoryLimit: 0.2,
  collectCoverage: true,
  coverageReporters: ["text-summary"],
};
