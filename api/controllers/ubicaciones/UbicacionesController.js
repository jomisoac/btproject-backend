// module.exports = {
//
//     joinWsUbicaciones(req, res){
//         sails.sockets.join(req, 'empleado'+req.allParams().empleado+'watcher');
//         res.ok();
//     },
//
//     postUbicacionEmpleado(req, res){
//         const data = req.allParams();
//         sails.sockets.broadcast('empresa'+data.empresa+'watcher', 'posEmpleados', req.allParams(), req);
//         res.ok();
//     },
//
//     findUbicacionEmpleados(req, res) {
//         sails.sockets.join(req, 'empresa'+req.allParams().id+'tracking');
//         res.ok();
//     }
// };