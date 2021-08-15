const User = require('../models/User');
const Role = require('../models/Role');

const bcrypt = require('bcrypt');

const createRoles = async() => {

    try{
        // crear contador  documentos existentes en modelos de Role
        const count = await Role.estimatedDocumentCount();
    
        if (count > 0 ) return;
    
        // Si el contador es igual a 0 entoces se crea un nuevo rol
        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save(),
        ]);
    
        console.log(values);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createRoles
}