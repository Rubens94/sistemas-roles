const { response } = require('express');
const User =  require('../models/User');
const { sign } = require('jsonwebtoken');
const Role = require('../models/Role');

// Crear usuario
const signUp = async(req, res = response) => {

    const { username, email, password, roles} = req.body;

    const user = await User.find({email});

    const newUser = new User({
        username,
        email,
        password
    });

    if(roles){
        // $in sirve para buscar en todos los documentos de mongo
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
    } else {
        const role = await Role.findOne({name: 'user'});
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = sign({id: savedUser._id}, process.env.SECRET, {
        expiresIn: 86400 // 24 horas en segundos
    });

    res.status(200).json({token});
}
// Login
const signIn = async(req, res = response) => {
    
    const { email, password } = req.body;

    // Verificar usuario del body con el de la BD
    const userFound = await User.findOne({email}).populate('roles', 'name');

    if(!userFound) return res.status(400).json('User not found'); 

    // Verificar contraseña del body con la de la BD
    const matchPassword = await User.comparePassword(password, userFound.password);

    if(!matchPassword) return res.status(400).json('Incorrect password');
    
    // Generar JWT
    const token = sign({id: userFound._id}, process.env.SECRET, {
        expiresIn: 86400 // 24 horas en segundos
    });

    res.json(token)
}

module.exports = {
    signUp,
    signIn
}