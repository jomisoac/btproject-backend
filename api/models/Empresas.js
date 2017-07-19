/**
 * Created by Jose M. Soto on 14/07/2017.
 */
module.exports = {

    attributes: {
        nit:                {type: 'string', size: 15, unique: true},
        nombre:             {type: 'string', size: 25, required: true},
        logo:               {type: 'string', size: 255,},
        direccion:          {type: 'string', size: 50},
        telefono:           {type: 'string', size: 15},
        fax:                {type: 'string', size: 20},
        email:              {type: 'string', size: 100},
        activa:             {type: 'boolean', defaultsTo: true},

        empleados: {
            collection: 'empleados',
            via: 'empresa'
        },

        user: {
            model: 'user'
        },

        toJSON() {
            var obj = this.toObject();
            delete obj.user;
            return obj;
        }
    },

    autoCreatedAt: true,

    afterDestroy(destroyedRecords, next){
        for (var i = 0; i < destroyedRecords.length; i++) {
            User.destroy({id: destroyedRecords[i].user}).exec(() => {
            });
        }
        next();
    }
};
