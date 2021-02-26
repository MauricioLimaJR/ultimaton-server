module.exports = {
  apps: [
    {
      name: 'matched-betting-tracker',
      script: './server.js',
      instances: 'max',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
