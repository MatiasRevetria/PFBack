const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/user.model');

const register = (req,res) => {
    const { email, password } = req.body;

    const hash = bcrypt.hashSync(password,8);
    console.log(hash);

    const user = {id: Date.now(), email, password: hash};
    users.push(user);

    const token = jwt.sign({id: user.id},process.env.SECRET_KEY,{expiresIn: '1h'});

    res.status(201).json({email, password: hash});
};

const login = (req,res) => {
    const {email, password} = req.body;
    const user = users.find((usuario) => usuario.email == email);

    if(!user){
        res.status(404).json({ error: "User not found"});
    }

    const valid = bcrypt.compareSync(password, user.password);
    if(!valid){
        return res.status(401).json({auth: false, token: null});
    }

    const token = jwt.sign({id: user.id},process.env.SECRET_KEY,{expiresIn: "1h"});

    res.json({ auth: true, token});
}


module.exports = {
    register,
    login
}