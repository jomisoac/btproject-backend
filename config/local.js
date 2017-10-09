/**
 * Local environment settings
 */

module.exports = {

  // ssl: {
  //   ca: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl_gd_bundle.crt'),
  //   key: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.key'),
  //   cert: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.crt')
  // },

  port: process.env.PORT || 1337,

  environment: process.env.NODE_ENV || 'development',

  connections: {
    mysqlServer: {
      user: 'root',
      password: ''
    },

  },

};
