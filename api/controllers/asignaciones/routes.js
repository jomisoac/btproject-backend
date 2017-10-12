module.exports.routes = {
    'GET /asignaciones': {
        controller: 'Asignaciones',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene las asignaciones',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }

    },
    'GET /empresa/:id/rango_fechas_asignaciones': {
        controller: 'Asignaciones',
        action: 'getAsignaciones',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene las asignaciones de una fecha seleccionada',
            responses: {
                200: {
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

    'PUT /asignaciones/:id/updateEstado': {
        controller: 'Asignaciones',
        action: 'updateEstado',

        swagger: {
            methods: ['PUT'],
            summary: 'Acualiza el estado de la asignacion',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'POST /asignaciones/:id/cancel_empleado': {
        controller: 'Asignaciones',
        action: 'cancelAsignacion',

        swagger: {
            methods: ['POST'],
            summary: 'Guarda la imagen de confirmacion de la asignacion',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
    'POST /asignaciones/:id/verify_empleado': {
        controller: 'Asignaciones',
        action: 'confirmAsignacion',

        swagger: {
            methods: ['POST'],
            summary: 'Guarda la imagen de confirmacion de la asignacion',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /asignaciones/:id/updateHora': {
        controller: 'Asignaciones',
        action: 'updateHora',

        swagger: {
            methods: ['PUT'],
            summary: 'Acualiza el estado de la asignacion',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'POST /asignaciones/:id/imagen': {
        controller: 'Asignaciones',
        action: 'saveImagen',

        swagger: {
            methods: ['POST'],
            summary: 'Guarda la imagen de confirmacion de la asignacion',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        },
    },

    'PUT /asignaciones/:id/updateTime': {
        controller: 'Asignaciones',
        action: 'updateTime',

        swagger: {
            methods: ['PUT'],
            summary: 'Actualiza tiempo',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        },
    }
}
