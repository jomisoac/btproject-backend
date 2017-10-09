const moment = require('moment');

module.exports = {

    attributes: {
        path: {type: 'string' },
        fecha: {type: 'datetime', defaultsTo: () => moment().format('YYYY-MM-DD HH:mm') },

        asignacion: {
            model: 'asignaciones'
        },
    },

    autoCreatedAt: true,
};