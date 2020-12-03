const pedidoController = require('./controllers/pedido.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = 10;
const PAID = 4;
const FREE = 1;
exports.routesConfig = function (app) {
app.post('/pedido', [
    //ValidationMiddleware.validJWTNeeded,    
    pedidoController.insert
]);
app.get('/pedido', [
    //ValidationMiddleware.validJWTNeeded, 
    pedidoController.list
]);
app.get('/pedido/:pedidoId', [
    //ValidationMiddleware.validJWTNeeded,    
    pedidoController.getById
]);
app.get('/pedido/byDate', [
    //ValidationMiddleware.validJWTNeeded,    
    pedidoController.getByDate
]);
app.patch('/pedido/:pedidoId', [ 
    //ValidationMiddleware.validJWTNeeded,    
    pedidoController.patchById
]);
app.delete('/pedido/:pedidoId', [
    //ValidationMiddleware.validJWTNeeded,    
    pedidoController.removeById
]);
};