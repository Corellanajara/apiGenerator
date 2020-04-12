var rutes = "const botonesController = require('./controllers/botones.controller');\r\nconst PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');\r\nconst ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');\r\nconst config = require('../common/config/env.config');\r\nconst ADMIN = config.permissionLevels.ADMIN;\r\nconst PAID = config.permissionLevels.PAID_USER;\r\nconst FREE = config.permissionLevels.NORMAL_USER;\r\nexports.routesConfig = function (app) {\r\napp.post('/botones', [\r\nValidationMiddleware.validJWTNeeded,\r\nPermissionMiddleware.minimumPermissionLevelRequired(FREE),\r\nbotonesController.insert\r\n]);\r\napp.get('/botones', [\r\nValidationMiddleware.validJWTNeeded,\r\nPermissionMiddleware.minimumPermissionLevelRequired(FREE),\r\nbotonesController.list\r\n]);\r\napp.get('/botones/:botonesId', [\r\nValidationMiddleware.validJWTNeeded,\r\nPermissionMiddleware.minimumPermissionLevelRequired(FREE),\r\nbotonesController.getById\r\n]);\r\napp.patch('/botones/:botonesId', [\r\nValidationMiddleware.validJWTNeeded,\r\nPermissionMiddleware.minimumPermissionLevelRequired(FREE),\r\nbotonesController.patchById\r\n]);\r\napp.delete('/botones/:botonesId', [\r\nValidationMiddleware.validJWTNeeded,\r\nPermissionMiddleware.minimumPermissionLevelRequired(ADMIN),\r\n\r\nbotonesController.removeById\r\n]);\r\n};";

module.exports = {
  get: function () {
    return rutes;
  },
  set: function (palabra) {
    return respuesta = new Promise((resolve, reject) => {
      while(rutes.includes("botones")){
        rutes = rutes.replace("botones",palabra)
        if(!rutes.includes("botones")){
          resolve(rutes);
        }
      }
    })

  }
};
