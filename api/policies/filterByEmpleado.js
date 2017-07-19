/**
 * Created by jose on 31/10/16.
 */

module.exports = function (req, res, next) {

    req.options.where = req.options.where || {};

    const user = req.user;

    if (user.rol === 'EMPLEADO') {
        if(req.options.model === 'empleados') return next();
        const filter = user.rol === 'EMPLEADO' ? {user: user.id} : null;
        Empleados.findOne(filter, {select: ['id']})
            .then((empleado) => {
                if(!empleado) return res.badRequest('no se encuentra el empleado de este usuario');
                req.options.where.empresa = empleado.empresa;
                req.user.empleado = {
                    id: empleado.id
                }
                req.user.empresa = {
                    id: empresa.id,
                };
                next();
            }).catch(res.negotiate);
    }
    else {
        return res.unauthorized('no tienes permiso de hacer esta peticion');
    }
}
