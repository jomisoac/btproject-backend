/**
 * Created by Jose M. Soto on 14/07/2017.
 */
module.exports = {

    attributes: {
        identificacion:     { type: 'string', required: true, unique: true },
        nombres:            { type: 'string', required: true, size: 50 },
        apellidos:          { type: 'string', required: true, size: 50 },
        imagen:             { type: 'string', required: false, size: 255 },
        telefono:           { type: 'string', required: true, size: 15 },
        fecha_nacimiento:   { type: 'date', required: true },
        fecha_ingreso:      { type: 'date', required: true },
        direccion:          { type: 'string', required: true, size: 50},
        email:              { type: 'email', size: 40},
        estado:             { type: 'string', defaultsTo: 'disponible'},
        activo:             { type: 'boolean', defaultsTo: true},
        movil:              { type: 'string', required: true, size: 50},
        iddispositivo:      { type: 'string', required: true, size: 50},

        // relaciones
        empresa: {
            model: 'empresas'
        },

        user: {
            model: 'user'
        },
        asignaciones: {
            collection: 'asignaciones',
            via: 'empleado'
        }

    },

    autoCreatedAt: true,
    autoUpdatedAt: true,

    updateEstado(id, estado) {
        this.update(id, {'estado': estado}).then(conductor => {
        }).catch(error => {sails.log.warn('update estado a empleado que no existee')})
    },

    afterCreate(newlyInsertedRecord, next){
        async.parallel({

        }, (err, result) => {
            Empleados.update(
                { id: newlyInsertedRecord.id }
            ).exec(() => {});
        });
        next();
    },

    afterDestroy(destroyedRecords, next){
        for (var i = 0; i < destroyedRecords.length; i++) {
            User.destroy({id: destroyedRecords[i].user}).exec(() => {});
        }
        next();
    },
};
