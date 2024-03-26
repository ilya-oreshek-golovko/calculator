const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@app-page' : path.resolve(__dirname, 'src', 'pages', 'App'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@handlers': path.resolve(__dirname, 'src', 'handlers'),
      '@data' : path.resolve(__dirname, 'src', 'data')
    },
  },
};