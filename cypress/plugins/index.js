// const webpack = require('@cypress/webpack-dev-server')
// https://on.cypress.io/plugins-guide
/// <reference types="cypress" />

/**
 * @type {import(@cypress/webpack-dev-server).StartDevServer}
 */
// const webpackConfig = {
//     module: {
//         rules: [
//             {
//                 test: /\.vue$/,
//                 loader: 'vue-loader',
//             },
//         ],
//     },
// };

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
    // on('dev-server:start', webpack.startDevServer({ webpackConfig }))

    return config;
};
