module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@testing-library|@testing-library/react|@whatwg-node)/)",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^.+/config/variables\\.js$":
      "<rootDir>/src/__tests__/__mocks__/variables.js",
  },
  testMatch: ["**/__tests__/**/*.(js|jsx)", "**/*.(test|spec).(js|jsx)"],
  moduleFileExtensions: ["js", "jsx", "json"],
  setupFiles: ["<rootDir>/src/__tests__/polyfills.js"],
};
