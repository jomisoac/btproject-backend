/**
 * WebSocket Server Settings
 */

module.exports.sockets = {
    // adapter: 'memory',
  adapter: 'socket.io-redis',
  host: 'cowfish.redistogo.com',
  port: 9011,
  pass: 'bccd85e4c5326f87a8b17cdb2561bff8',
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
