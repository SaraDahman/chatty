const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const { userModel } = require('../models');
const { GenerateError, generateToken } = require('../helpers');


const getGoogleCredentials = async (req, res, next) => {
    const { credentialResponse: { credential, client_id }, mode } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
        });
        const payload = ticket.getPayload();
        const { name, email } = payload;

        let user = await userModel.findOne({ email })


        if (mode == 'sign in' && !user) throw new GenerateError(400, 'Email doesn\'t exists');
        if (mode == 'sign up' && user) throw new GenerateError(400, 'Email already in use');

        if (mode == 'sign up' && !user) {
            user = await userModel.create({ name, email })

            const token = await generateToken({ id: user._id, email: user.email })

            res.status(200).json({ _id: user._id, name: user.name, email: user.email, token })
        }

        if (mode == 'sign in' && user) {
            const token = await generateToken({ id: user._id, email: user.email })

            res.status(200).json({ _id: user._id, name: user.name, email: user.email, token })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getGoogleCredentials
}

