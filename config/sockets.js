/**
 * WebSocket Server Settings
 */

module.exports.sockets = {
    // adapter: 'memory',
  adapter: 'socket.io-redis',
  host: 'localhost',
  port: 6379,
  pass: '',
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

  transports: ['websocket', 'polling']

};
