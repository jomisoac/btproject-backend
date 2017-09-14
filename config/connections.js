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
        host: 'us-cdbr-iron-east-05.cleardb.net',
        user: 'b534018f70525e',
        password: '9220f58b',
        database: 'heroku_64e664d19d07633'//optional
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
