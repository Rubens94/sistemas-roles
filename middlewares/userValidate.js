const { response } = require('express');
const {
    body,
    validationResult
} = require('express-validator');

const userValidate = async(req, res = response, next) => {

    // Verificar que el password y el campo confirmar coincidan para poder crear el usuario
    const rules = [
        body('confirm').equals(req.body.password).withMessage('Passwords do not match'),
    ];

    await Promise.all(rules.map( validation => validation.run(req) ));
    const errores = validationResult(req);

    // Si hay errores
    if(!errores.isEmpty()) return res.status(409).json(errores.array().map(error => error.msg));
    
    // Si la validación es correcta
    next();
}

module.exports = {
   userValidate
}