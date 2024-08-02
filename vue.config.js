// vue.config.js

const { DefinePlugin } = require('webpack');

module.exports = {
  devServer: {
    port: 8081, // Set the frontend port to 8081
    proxy: {
      '/api': {
        target: 'http://3.37.71.106:8080', // Backend server URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
        // Add other flags if needed
      })
    ]
  }
};
