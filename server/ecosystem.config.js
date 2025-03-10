module.exports.apps = [
  {
    name: "yad2",
    script: "./dist/app.js",
    env_production: {
      NODE_ENV: "production",
    },
  },
];
