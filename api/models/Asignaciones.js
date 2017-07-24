const moment = require('moment');

module.exports = {

    attributes: {
        fecha_asignada:    {type: 'string', defaultsTo: () => moment().format('YYYY-MM-DD') },
        fecha_finalizada:    {type: 'string', defaultsTo: () => moment().format('YYYY-MM-DD') },
        cliente_identificacion:  {type: 'string', size: 12},
        cliente_nombre:  {type: 'string', size: 150},
        cliente_telefono: {type: 'string', size: 12},
        lugar_lat: {type: 'string', size: 255},
        direccion: {type: 'string', size: 80},
        lugar_lng: {type: 'string', size: 255},
        estado: {type: 'string', size: 20, defaultsTo: 'vigente'},

        empleado: {
            model: 'empleados'
        },

        empresa: {
            model: 'empresas'
        },
    },

    autoCreatedAt: true,
};