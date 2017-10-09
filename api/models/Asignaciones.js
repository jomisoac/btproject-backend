const moment = require('moment');

module.exports = {

    attributes: {
        fecha_asignada:    {type: 'date', defaultsTo: () => moment().format('YYYY-MM-DD') },
        fecha_finalizada:    {type: 'date' },
        fecha_ingreso:  {type:'date',defaultsTo: () => moment().format('YYYY-MM-DD') },
        hora_asignada: {type: 'string'},
        hora_finalizada: {type: 'string'},
        cliente_nombre:  {type: 'string', size: 150},
        cliente_telefono: {type: 'string', size: 12},
        pos_lat: {type: 'string', size: 255},
        direccion: {type: 'string', size: 80},
        ciudad: {type: 'string', size: 80},
        pos_lng: {type: 'string', size: 255},
        estado: {type: 'string', size: 20, defaultsTo: 'vigente'},
        // imagen: {type: 'string'},
        duracion: {type: 'integer', defaultsTo: 0},

        empleado: {
            model: 'empleados'
        },

        empresa: {
            model: 'empresas'
        },

        images: {
            collection: 'images',
            via: 'asignacion'
        }
    },

    autoCreatedAt: true,
};