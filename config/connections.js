/**
 * Connections
 */

module.exports.connections = {

  /***************************************************************************
  * Local disk storage for DEVELOPMENT ONLY                                  *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  * MySQL                                                                    *
  ***************************************************************************/
  mysqlServer: {
    adapter: 'sails-mysql',
    host: process.env.CLEARDB_DATABASE_URL,
    database: process.env.CLEARDB_NAME//optional
  },


  /***************************************************************************
  * Redis                                                                    *
  ***************************************************************************/
  redis: {
    adapter: 'sails-redis',
    port: 9011,
    host: 'cowfish.redistogo.com',
    password: 'bccd85e4c5326f87a8b17cdb2561bff8'
  },

};
