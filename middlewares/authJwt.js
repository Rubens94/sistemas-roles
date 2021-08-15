const { verify } = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const verifyToken = async(req, res, next) => {

    try{

        const token = req.headers['x-access-token'];
    
        if(!token) return res.status(403).json({msg: 'Not token provided'});
    
        // Extraer el id del usuario del JWT
        const decoded = verify( token, process.env.SECRET);
    
        // Verificar si el usuario existe extrallendo el ID
        req.userId = decoded.id;
        
        const user = await User.findById(req.userId, {password: 0}); // no usar la contraseña
    
        if(!user) return res.status(404).json({msg: 'Not user found'});
       
        next();
    } catch (err) {
        // Si el token no es valido 
        return res.status(401).json({msg: 'Unauthorized'});
    }
}

const isModerator = async(req, res, next) => {

    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } }); // $in = incluido
    
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
    
        return res.status(403).json({ message: "Require Moderator Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

const isAdmin = async(req, res, next) => {

    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });
    
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
    
        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

module.exports = {
    verifyToken,
    isModerator,
    isAdmin
}