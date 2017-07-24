module.exports.routes = {
    'GET /asignaciones': {
        controller: 'Asignaciones',
        action: 'find',

        swagger:{
            methods: ['GET'],
            summary: 'Obtiene las asignaciones',
            responses:{
                200:{
                    description: 'OK'
                }
            }
        }

    },
    'GET /empresa/:id/rango_fechas_asignaciones': {
        controller: 'Asignaciones',
        action: 'getAsignaciones',

        swagger:{
            methods: ['GET'],
            summary: 'Obtiene las asignaciones de una fecha seleccionada',
            responses:{
                200:{
                    description: 'OK'
                }
            }
        }
    },

    'POST /asignaciones': {
        controller: 'Asignaciones',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Guardar una nueva asignacion',
            responses: {
                202: {
                   desciption: 'OK'
                }
            },
        }
    },

    'PUT /asignaciones/:id/cancel': {
        controller: 'Asignaciones',
        action: 'updateEstado',

        swagger: {
            methods: ['PUT'],
            summary: 'Anular asignacion',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    }
}