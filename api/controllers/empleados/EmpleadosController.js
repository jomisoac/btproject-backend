/**
 * Created by Jose M. Soto on 18/07/2017.
 */
const actionUtil = require('../../blueprints/myActionUtil');
const _ = require('lodash');
var fs = require('fs');
const uid = require('uid-safe');
const moment = require('moment');

module.exports = {
    identity: 'Empleados',

    create(req, res) {
        const data = req.allParams();
        data.empresa = req.user.empresa.id;

        data.user = {
            username: String(data.identificacion),
            password: String(data.identificacion),
            rol: 'EMPLEADO',
            email: req.allParams().email || ''
        };
        Empleados.create(data)
            .then(res.ok)
            .catch(error => {
                if (!error.invalidAttributes.username && data.user.username) {
                    User.destroy({username: data.user.username}).exec(() => {
                    });
                }
                res.negotiate(error);
            });
    },

    findOne(req, res){
        Empleados.findOne({identificacion: req.allParams().id})
            .populate('asignaciones').where({estado:'finalizado'})
            .then((empleado) => {
                if (empleado) {
                    res.ok(empleado);
                } else {
                    return res.notFound('El empleado que intenta buscar no existe');
                }
            }).catch(res.negotiate);
    },

    findAsignaciones(req, res){
        Empleados.findOne({identificacion: req.allParams().id})
            .then((empleado) => {
                if (empleado) {
                    Asignaciones.find({
                        empleado: empleado.id,
                        estado: 'finalizado',
                        createdAt: limitFecha(req)
                    }).populate('images').then(asignaciones => {
                        var data = {
                            empleado : empleado,
                            asignaciones: asignaciones
                        }
                        return res.ok(data);
                    })
                } else {
                    return res.notFound('El empleado que intenta buscar no existe');
                }
            }).catch(res.negotiate);

    },

    find(req, res){

        if (req.param('fields')) {
            var fields = req.param('fields').replace(/ /g, '').split(',');


            //verifico que no este consultando una columna que no exista en empleados
            const dif = actionUtil.checkFields(fields, Empleados);
            if (dif.length) {
                return res.badRequest({'error': 'error in fields, [' + dif.toString() + ']'});
            }

            var query = Empleados.find({select: fields});

            query.where(actionUtil.parseCriteria(req))
                .limit(actionUtil.parseLimit(req))
                .skip(actionUtil.parseSkip(req))
                .sort(actionUtil.parseSort(req))
                .then((empleados) => {
                    res.ok(empleados)
                }).catch(res.negotiate);


        } else {
            res.badRequest('El parametro fields es obligatorio para esta petición')
        }
    },

    saveImagen(req, res){
        Empleados.findOne({id: req.allParams().id})
            .then((empleado) => {
                if (empleado) {
                    if(empleado.imagen)
                        fs.unlink(sails.config.appPath + '/public/images/empleados/'+empleado.imagen);
                            req.file('file').upload({
                                dirname: sails.config.appPath + '/public/images/empleados',
                                saveAs: function (__newFileStream, cb) {
                                    cb(null, uid.sync(18) + empleado.id + '.' + _.last(__newFileStream.filename.split('.')));
                                }
                            },
                            (error, uploadedFiles) => {
                                if (error) return res.negotiate(error);
                                if (!uploadedFiles[0]) return res.badRequest('ha ocurrido un erro inesperado al almacenar la imagen');
                                const filename = _.last(uploadedFiles[0].fd.split('\\'));
                                empleado.imagen = filename;
                                empleado.save((err, s) => res.ok('files upload'));
                            });
                } else {
                    return res.notFound('el empleado no existe');
                }
            }).catch(res.negotiate);
    },

    updateEstado(req, res){
        const data = req.allParams();
        console.log(data);
        Empleados.findOne({id : req.params.id})
            .then((empleado) => {
                if(empleado){
                    if(data.estado !== empleado.estado){
                        empleado.estado = data.estado;
                        empleado.save(function(){
                            sails.sockets.broadcast('empresa'+empleado.empresa+'watcher', 'cambioEstado', empleado, req);
                            res.ok();
                        });
                    }else{
                        res.ok('El empleado ya tiene el estado')
                    }
                }else{
                    return res.notFound('No se encontro al empleado.')
                }
            })
            .catch(res.negotiate)
    },

    estadoPulsera(req, res){
        const data = req.allParams();
        console.l
        Empleados.findOne({id : req.params.id})
            .then((empleado) => {
                if(empleado){
                    if(data.estado === '0')
                        sails.sockets.broadcast('empresa'+empleado.empresa+'watcher', 'connectPulsera', empleado, req);
                    if(data.estado === '255')
                        sails.sockets.broadcast('empresa'+empleado.empresa+'watcher', 'deconnectPulsera', empleado, req);
                    res.ok();
                }else{
                    return res.notFound('No se encontro al empleado.');
                }
            })
            .catch(res.negotiate)
    },

    notifyDeconection(req, res){
        const data = req.allParams();
        Empleados.findOne({id : req.params.id})
            .then((empleado) => {
                sails.sockets.broadcast('empresa'+empleado.empresa+'watcher', 'notifyDeconection', empleado, req);
            })
            .catch(res.negotiate)
    },
    postUbicacionEmpleado(req, res){
        const data = req.allParams();
        Empleados.findOne({id : req.params.id})
            .then((empleado) => {
                data.empleado = empleado;
                sails.sockets.broadcast('empresa'+empleado.empresa+'watcher', 'posEmpleados', data, req);
            })
            .catch(res.negotiate)
        res.ok();
    },

    getListMessages(req, res){
        Messages.find({empleado: req.allParams().id}).then((mensajes)=>{
            return res.ok(mensajes);
        })
    },
    sendMessage(req, res){
        Messages.create(req.allParams()).then((message)=>{
            sails.sockets.broadcast('empresa'+message.empresa+'watcher', 'MensajeEmpleado'+message.empleado, message, req)
            res.ok(message);
        }).catch(res.negotiate);
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
