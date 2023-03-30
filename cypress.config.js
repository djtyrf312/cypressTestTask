const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: 'https://bold-sun-8337.fly.dev',
  },
});
