// // vue.config.js
//
// const { DefinePlugin } = require('webpack');
//
// module.exports = {
//   devServer: {
//     port: 8080, // Set the backend port
//     proxy: {
//       '/api': {
//         target: 'http://backend', // Backend server URL
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   },
//   configureWebpack: {
//     plugins: [
//       new DefinePlugin({
//         __VUE_PROD_DEVTOOLS__: 'false',
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
//         // Add other flags if needed
//       })
//     ]
//   }
// };
