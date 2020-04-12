const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const AuthorizationRouter = require('./authorization/routes.config');
const cuentasRouter = require('./cuenta/routes.config');
const casosRouter = require('./casos/routes.config');
const documentosRouter = require('./documentos/routes.config');
const estadosCaso = require('./estadosCaso/routes.config');
const estadosTareas = require('./estadosTareas/routes.config');
const tareaRouter = require('./tarea/routes.config');
const userRouter = require('./users/routes.config');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
cuentasRouter.routesConfig(app);
cuentasRouter.routesConfig(app);
casosRouter.routesConfig(app);
documentosRouter.routesConfig(app);
estadosCaso.routesConfig(app);
estadosTareas.routesConfig(app);
tareaRouter.routesConfig(app);
userRouter.routesConfig(app);


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
