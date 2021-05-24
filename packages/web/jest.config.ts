export default {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "\\.(ts|tsx)$": ["ts-jest"],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@paperpod))",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};
