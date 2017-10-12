const moment = require('moment');

module.exports = {
    attributes: {
        message: {type: 'string' },
        fecha: {type: 'datetime', defaultsTo: () => moment().format('YYYY-MM-DD HH:mm') },
        who: {type: 'string', defaultsTo: 'contact' },
        empleado: {
            model: 'empleados',
            unique: false
        },
        empresa: {
            model: 'empresas',
            unique: false
        }
    },

    autoCreatedAt: true,
};