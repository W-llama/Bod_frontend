// // vue.config.js
//
// const { DefinePlugin } = require('webpack');
//
// module.exports = {
//     devServer: {
//         port: 8081,
//         proxy: {
//             '/api': {
//                 target: 'http://3.37.71.106:8080',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     },
//     configureWebpack: {
//         plugins: [
//             new DefinePlugin({
//                 __VUE_PROD_DEVTOOLS__: 'false',
//                 __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
//                 'process.env.VUE_APP_API_URL': JSON.stringify(process.env.NODE_ENV === 'production' ? 'http://challengersbod.store' : 'http://localhost:8080')
//             })
//         ]
//     }
// };
