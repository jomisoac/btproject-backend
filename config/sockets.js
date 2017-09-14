/**
 * WebSocket Server Settings
 */
var redis_url = require('url').parse(process.env.REDISTOGO_URL);
module.exports.sockets = {
    // adapter: 'memory',
  adapter: 'socket.io-redis',
  host: redis_url.hostname,
  port: redis_url.port,
  pass: redis_url.auth.split(":")[1],
  db: 'sails',
    origins: '*:*',
    onlyAllowOrigins: '*:*',
  grant3rdPartyCookie: true,

  beforeConnect(handshake, cb) {
    // `true` allows the connection
    return cb(null, true);

    // (`false` would reject the connection)
  },

  afterDisconnect(session, socket, cb) {
    // By default: do nothing.
    return cb();
  },

  transports: ["websocket"]

};
