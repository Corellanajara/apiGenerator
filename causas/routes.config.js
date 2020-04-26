const causasController = require('./controllers/causas.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
exports.routesConfig = function (app) {
app.post('/causas', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
causasController.insert
]);
app.get('/causas', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
causasController.list
]);
app.get('/causas/:causasId', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
causasController.getById
]);
app.patch('/causas/:causasId', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
causasController.patchById
]);
app.delete('/causas/:causasId', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),

causasController.removeById
]);
};
