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


module.exports = {
    register
}