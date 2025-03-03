const { userModel } = require('../models');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { GenerateError, generateToken } = require('../helpers');


const registerUser = async (req, res, next) => {

    try {
        const { name, email, password } = req.body

        // validated the user data
        let user = await userModel.findOne({ email })

        if (!name || !email || !password) throw new GenerateError(400, 'Missing Field: name, email, password');
        if (user) throw new GenerateError(400, 'Email Already In Use');
        if (!validator.isEmail(email)) throw new GenerateError(400, 'Email must be valid')
        if (!validator.isStrongPassword(password)) throw new GenerateError(400, 'Password must be strong')

        // hash the password and create a new user record
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await userModel.create({ name, email, password: hashedPassword })

        //create a user token
        const token = await generateToken({ id: user._id, email: user.email })

        res.status(200).json({ id: user._id, name: user.name, email: user.email, token })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email })
        if (!email || !password) throw new GenerateError(400, 'Missing Field: email, password');
        if (!user) throw new GenerateError(400, 'Invalid email or password');

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) throw new GenerateError(400, 'Invalid email or password')

        const token = await generateToken({ id: user._id, email: user.email })

        res.status(200).json({ id: user._id, name: user.name, email: user.email, token })
    } catch (error) {
        next(error)
    }
}


const findUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await userModel.findById(userId)

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    findUser,
    getUsers
}