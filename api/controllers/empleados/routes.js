/**
 * Created by Jose M. Soto on 18/07/2017.
 */
module.exports.routes = {

    'POST /empleados': {
        controller: 'Empleados',
        action: 'create',

        swagger: {
            methods: ['POST'],
            summary: 'Guardado de un empleado',
            responses: {
                201: {
                    schema: 'Empleados'
                }
            },
            parameters: [{
                in: 'body',
                name: 'Datos de Guardado',
                description: 'Guarda un empleado',
                required: true,
                schema: {
                    type: 'object',
                    required: ['identificacion', 'nombres', 'apellidos', 'direccion', 'telefono'],
                    properties: {
                        'identificacion': {type: 'string'},
                        'nombres': {type: 'string'},
                        'apellidos': {type: 'string'},
                        'direccion': {type: 'string'},
                        'telefono': {type: 'string'}
                    }
                }
            }]
        }
    },

    'GET /empleados': {
        controller: 'Empleados',
        action: 'find',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas los empleados de una empresa',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /empleados/:id/asignaciones': {
        controller: 'Empleados',
        action: 'findAsignaciones',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene todas los empleados de una empresa',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'GET /empleados/:id': {
        controller: 'Empleados',
        action: 'findOne',

        swagger: {
            methods: ['GET'],
            summary: 'Obtiene un empleado',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /empleados/:id': {
        controller: 'Empleados',
        action: 'update',

        swagger: {
            methods: ['PUT'],
            summary: 'Actualiza un empleado',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /empleados/:id/cambioEstado': {
        controller: 'Empleados',
        action: 'updateEstado',

        swagger: {
            methods: ['PUT'],
            summary: 'Actualiza el estado',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
    'PUT /empleados/:id/estado_pulsera': {
        controller: 'Empleados',
        action: 'estadoPulsera',

        swagger: {
            methods: ['PUT'],
            summary: 'Actualiza el estado de la pulsera',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'PUT /empleados/:id/notify_deconection': {
        controller: 'Empleados',
        action: 'notifyDeconection',

        swagger: {
            methods: ['PUT'],
            summary: 'Notifica el estado de la coneccion a internet del empleado',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },

    'DELETE /empleados/:id': {
        controller: 'Empleados',
        action: 'destroy',

        swagger: {
            methods: ['DELETE'],
            summary: 'Elimina un empleado',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
    'POST /empleados/:id/imagen': {
        controller: 'Empleados',
        action: 'saveImagen',

        swagger: {
            methods: ['POST'],
            summary: 'Guarda la imagen del empleado',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
    'POST /empleados/:id/ubicaciones': {
        controller: 'Empleados',
        action: 'postUbicacionEmpleado',

        swagger: {
            methods: ['POST'],
            summary: 'Envia la ubicacion del empleado',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
    'GET /empleados/:id/mensajes': {
        controller: 'Empleados',
        action: 'getListMessages',

        swagger: {
            methods: ['GET'],
            summary: 'Lista mensajes de la empresa',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
    'POST /empleados/mensajes': {
        controller: 'Empleados',
        action: 'sendMessage',

        swagger: {
            methods: ['POST'],
            summary: 'Lista mensajes de la empresa',
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
};
