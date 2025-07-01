export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",

    "^../services/weatherAPI$": "<rootDir>/src/__mocks__/weatherAPI.js",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".jsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@tanstack/|tailwindcss|react-i18next|react-router|react-router-dom)).+\\.js$",
  ],
  testMatch: ["**/__tests__/**/*.?(m)jsx", "**/?(*.)+(spec|test).?(m)jsx"],

  globals: {
    "import.meta": {
      env: {
        VITE_OWM_API_KEY: "test-api-key",
      },
    },
  },
};
