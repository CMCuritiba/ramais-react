module.exports = {
  apps: [
    {
      name: 'Ramais API',
      script: './dist/server.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      // args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_staging: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
    staging: {
      user: 'suporte',
      host: '10.0.0.61',
      ref: 'origin/master',
      repo: 'https://github.com/CMCuritiba/ramais-react.git',
      path: '/usr/share/webapps/ramais-react',
      'post-deploy':
        'cd backend && npm install && npm run build && pm2 reload ecosystem.config.js --env staging',
    },
  },
};
