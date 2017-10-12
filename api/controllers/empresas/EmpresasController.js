/**
 * Created by Jose M. Soto on 14/07/2017.
 */
const _ = require('lodash');
const uid = require('uid-safe');
const fs = require('fs');

module.exports = {
    identity: 'Empresas',

    create(req, res) {
        const data = req.allParams();
        if (!data.user) return res.badRequest('Espera, aun no envias la información de acceso de la empresa.');
        data.user.rol = 'EMPRESA';
        Empresas.create(data)
            .then(function (empresa) {
                empresa.save(function (err) {
                    res.ok(empresa);
                })
            })
            .catch(error => {
                if (!error.invalidAttributes.username && data.user.username) {
                    User.destroy({username: data.user.username}).exec(() => {
                    });
                }
            })
    },

    findEmpleados(req, res){
        Empresas.find({id: req.allParams().id}).populate('empleados').then(empresa => {
            return res.ok(empresa)
        })
    },

    getChatsEmpleado(req, res){
        Messages.find({empleado: req.allParams().id}).then((messages)=>{
          return res.ok(messages);
        })
    },
    sendMessageEmpleado(req, res){
        var data = req.allParams();
        Messages.create(data).then((message)=>{
            sails.sockets.broadcast('empleado'+message.empleado+'watcher', 'NuevoMensaje', message, req)
            res.ok(message)
        })
    },

    saveLogo(req, res){
        Empresas.findOne({id: req.allParams().id})
            .then((empresa) => {
                if (empresa) {
                    if(empresa.logo)
                        fs.unlink(sails.config.appPath + '/public/images/empresas/'+empresa.logo);
                        req.file('logo').upload({
                            dirname: sails.config.appPath + '/public/images/empresas',
                            saveAs: function (__newFileStream, cb) {
                                cb(null, uid.sync(18) + empresa.id + '.' + _.last(__newFileStream.filename.split('.')));
                            }
                        },
                        (error, uploadedFiles) => {
                            if (error) return res.negotiate(error);
                            if (!uploadedFiles[0]) return res.badRequest('ha ocurrido un erro inesperado al almacenar la imagen');
                            const filename = _.last(uploadedFiles[0].fd.split('/'));
                            empresa.logo = filename;
                            empresa.save((err, s) => res.ok('files upload'));
                        });
                } else {
                    return res.notFound('la empresa no existe');
                }
            }).catch(res.negotiate);
    },
};
