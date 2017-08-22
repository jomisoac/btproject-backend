/**
 * AsignacionesController
 *
 * @description :: Server-side logic for managing asignaciones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const moment = require('moment');

module.exports = {
    identity: 'Asignaciones',

    create(req, res){
        var data = req.allParams();

        async.parallel({
            empresa: cb => {
                Empresas.findOne(req.user.empresa.id).exec(cb);
            }
        }, function (err, result) {
            if (err) return res.negotiate(err);

            data.empresa = result.empresa.id;

            Asignaciones.create(data).then(asignacion => {

                Empleados.update(asignacion.empleado, {
                    estado: 'ocupado'
                }).then(updateRecords => {
                    broadcastAsignacion(asignacion.empleado);
                    return res.ok();
                });
            }).catch(res.negotiate);
        });

        function broadcastAsignacion(data) {
            Empleados.findOne({id: data}).then((empleado) => {
                User.findOne({id: empleado.user}).then((user) => {
                    var data = {
                        title: 'Trabajo asignado',
                        type: 'trabajo',
                        body: 'Se te asigno un nuevo trabajo, actualiza para verificarlo.'
                    }
                    PusherService.send(data, user.reg_id);
                })
            });
        }
    },

    getAsignaciones(req, res){
        Asignaciones.find({
            where: {
                empresa: req.allParams().id,
                createdAt: limitFecha(req)
            },
            sort: 'createdAt DESC'
        }).populate('empleado').then(asignaciones => {
            return res.ok(asignaciones);
        })
    },

    updateEstado(req, res){
        Asignaciones.update(req.allParams().id, {
            estado: req.allParams().estado
        }).then(updateRecords => {
            Empleados.findOne({id: updateRecords[0].empleado}).then((empleado) => {
                var data = {
                    empleado : empleado,
                    trabajo: updateRecords[0]
                };
                sails.sockets.broadcast('empresa'+empleado.empresa+'watcher', 'trabajoSocket', data, req);
            });
            return res.ok();
        });
    },

    acceptAsignacion(req, res){

    }

};

function limitFecha(req, default_dia) {
    var fecha_hasta = req.param('fecha_hasta') ? moment(req.param('fecha_hasta')) : moment();
    if (req.param('fecha_desde')) {
        var fecha_desde = moment(req.param('fecha_desde'));
    } else {
        default_dia || (default_dia = false);
        var fecha_desde = default_dia ? moment() : moment().date(1);
    }
    fecha_desde.set('hour', 0).set('minute', 0).set('second', 0);
    fecha_hasta.set('hour', 0).set('minute', 0).set('second', 0);
    // fecha_desde.add(-1, 'd');
    fecha_hasta.add(1, 'd');

    console.log(fecha_desde.toDate(), '**************');
    console.log(fecha_hasta.toDate(), '**************');
    return {
        '>=': fecha_desde.toDate(),
        '<': fecha_hasta.toDate()
    }
};