const UserModel = require('../../users/models/users.model');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.correo) {
            errors.push('Falta el correo');
        }
        if (!req.body.clave) {
            errors.push('Falta la contraseña');
        }
        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Faltan los datos para iniciar'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    console.log(req.body.correo);
    UserModel.findByEmail(req.body.correo)
        .then((user)=>{
            console.log(user);
            if(!user[0]){
                res.status(404).send({});
            }else{
                let passwordFields = user[0].clave.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.clave).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user[0]._id,
                        email: user[0].correo,
                        permissionLevel: user[0].permissionLevel,
                        provider: 'email',
                        name: user[0].nombreUsuario,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Correo o contraseña invalidos']});
                }
            }
        });
};
