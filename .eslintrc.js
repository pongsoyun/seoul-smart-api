module.exports = {
  parserOptions: {
    ecmaVersion: 9
  },
  env: {
    browser: true,
    commonjs: true,
    node: true,
    jquery: true
  },
  extends: "airbnb-base",
  plugins: ["import", "html"]
};
