const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY

const generateToken = ({ id, email }) => {

    return new Promise((resolve, reject) => {
        if (!secret) throw new Error("secret key is missing");

        jwt.sign({ id, email }, secret, { expiresIn: '3d' }, (err, token) => {
            if (err) reject(err)
            else resolve(token)
        })
    })
}


module.exports = generateToken;