const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8000/upload',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
  }
];

module.exports = PROXY_CONFIG;
