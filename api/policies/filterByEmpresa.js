/**
 * Created by tav0 on 12/09/16.
 */

module.exports = function (req, res, next) {

    req.options.where = req.options.where || {};

    const user = req.user;

    if (user.rol === 'EMPRESA') {
        Empresas.findOne({user: user.id}, {select: ['id']})
            .then((empresa) => {
                if(!empresa) return res.badRequest('no se encuentra la empresa de este usuario');
                req.options.where.empresa = empresa.id;
                req.user.empresa = {
                    id: empresa.id
                };
                next();
            }).catch(res.negotiate);
    }
    else if (user.rol === 'EMPLEADO') {
        if(req.options.model === 'empleados') return next();
        const filter = user.rol === 'EMPLEADO' ? {user: user.id} : null;
        Empleados.findOne(filter, {select: ['id']})
            .then((empleado) => {
                if(!empleado) return res.badRequest('no se encuentra el conductor de este usuario');
                req.options.where.empresa = empleado.empresa;
                req.user.empleado = {
                    id: empleado.id
                }
                req.user.empresa = {
                    id: empleado.empresa,
                };
                next();
            }).catch(res.negotiate);
    }
    else {
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
}
