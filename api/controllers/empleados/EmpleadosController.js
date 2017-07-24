/**
 * Created by Jose M. Soto on 18/07/2017.
 */
const actionUtil = require('../../blueprints/myActionUtil');
const _ = require('lodash');
var fs = require('fs');
const uid = require('uid-safe');

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
        Empleados.findOne({id : req.params.id})
            .then((empleado) => {
                if (empleado) {
                    if(empleado.imagen)
                        fs.unlink(sails.config.appPath + '/public/images/empleados/'+empleado.imagen);
                    req.file('imagen').upload({
                            dirname: sails.config.appPath + '/public/images/empleados',
                            saveAs: function (__newFileStream, cb) {
                                cb(null, uid.sync(18) + empleado.id + '.' + _.last(__newFileStream.filename.split('.')));
                            },
                            maxBytes: 10000000
                        },
                        (error, uploadedFiles) => {
                            if (error) return res.negotiate(error);
                            if (!uploadedFiles[0]) return res.badRequest('ha ocurrido un error inesperado al almacenar la imagen');
                            const filename = _.last(uploadedFiles[0].fd.split('/'));
                            empleado.imagen = filename;
                            empleado.save((err, s) => res.ok('Archivos cargados'));
                        }
                    );
                } else {
                    return res.notFound('El empleado no existe');
                }
            }).catch(res.negotiate);
    },

    updateEstado(req, res){
        const data = req.allParams();
        Empleados.findOne({id : req.params.id})
            .then((empleado) => {
                if(empleado){
                    if(data.estado !== empleado.estado){
                        Empleados.update(empleado.id, {estado : data.estado})
                            .then(function (de) {
                                empleado.estado = data.estado;
                                sails.sockets.broadcast('empresa'+empleado.empresa+'watcher', 'cambioEstado', empleado, req);
                                res.ok();
                            })
                            .catch(res.negotiate)
                    }
                    res.ok('el empleado ya tenia el estado '+data.estado);
                }else{
                    return res.notFound('No se encontro al empleado.')
                }
            })
            .catch(res.negotiate)
    }
};
