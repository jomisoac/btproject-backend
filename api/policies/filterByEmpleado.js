/**
 * Created by jose on 17/07/17.
 */

module.exports = function (req, res, next) {

    req.options.where = req.options.where || {};

    const user = req.user;

    if (user.rol === 'EMPLEADO') {
        if(req.options.model === 'empleados') return next();
        const filter = user.rol === 'EMPLEADO' ? {user: user.id} : null;
        Empleados.findOne(filter, {select: ['id']})
            .then((empleado) => {
                if(!empleado) return res.badRequest('no se encuentra la central de este usuario');
                req.options.where.empleado = empleado.id;
                req.user.empleado = {
                    id: empleado.id
                };
                req.user.empresa = {
                    id: empleado.empresa
                };
                next();
            }).catch(res.negotiate);
    }
    else if (user.rol === 'EMPRESA') {
        if(['Empresa'].indexOf(req.options.model) != -1) return next();
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
    else {
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
}