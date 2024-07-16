const jwt = require('jsonwebtoken');
const users = require('../models/user.model');

module.exports = (req,res,next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(403).send({ auth: false, message: 'No se proveyo un token'});
    };
    // extrae el token del encabezado (formato "bearer <token>"")
    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(403).send({ auth: false, message: 'Malformed token'});
    };

    //decoded tiene el contenido del payload
    jwt.verify(token, process.env.SECRET_KEY, (err,decoded) => {
        if (err){
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
        };

        const user = users.find((us) => us.id == decoded.id);
        if(!user){
            return res.status(404).json({ error: 'User not found'});
        };

        req.userId = decoded.id;
        next();
    });
}