/**
 * Policy Mappings
 */


module.exports.policies = {

    /*******************************************************************************
     * Default policy for all controllers and actions (`true` allows public access) *
     ********************************************************************************/

    '*': [
        'isAuthenticated'
    ],

    'user/AuthController': {
        '*': true
    },

    SwaggerController: {
        '*': true
    },

    EmpleadosController: {
        '*': ['isAuthenticated', 'filterByEmpresa']
    },

    AsignacionesController: {
        '*': ['isAuthenticated', 'filterByEmpresa']
    },
};
