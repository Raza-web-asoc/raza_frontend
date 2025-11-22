module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@testing-library|@testing-library/react)/)",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testMatch: ["**/__tests__/**/*.(js|jsx)", "**/*.(test|spec).(js|jsx)"],
  moduleFileExtensions: ["js", "jsx", "json"],
};
