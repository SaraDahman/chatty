const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const { userModel } = require('../models');
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

        res.status(200).json({ _id: user._id, name: user.name, email: user.email, token })
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

        res.status(200).json({ _id: user._id, name: user.name, email: user.email, token })
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

const getPotentialUsers = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const potentialUsers = await userModel.aggregate([
            {
                $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(userId) }
                }
            },
            {
                $lookup: {
                    from: "chats", // Name of the chats collection
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr:
                                // {
                                //     $or: [
                                //         { $eq: ["$senderId", "$$userId"] },
                                //         { $eq: ["$receiverId", "$$userId"] }
                                //     ]
                                // },
                                {
                                    $or: [
                                        {
                                            $and: [
                                                { $eq: ["$senderId", "$$userId"] }, // User is the sender
                                                { $eq: ["$receiverId", new mongoose.Types.ObjectId(userId)] } // userId is the receiver
                                            ]
                                        },
                                        {
                                            $and: [
                                                { $eq: ["$senderId", new mongoose.Types.ObjectId(userId)] }, // userId is the sender
                                                { $eq: ["$receiverId", "$$userId"] } // User is the receiver
                                            ]
                                        }
                                    ]
                                }

                            }
                        }
                    ],
                    as: "userChats"
                }
            },
            {
                $match: {
                    userChats: { $size: 0 } // Filter users with no chats
                }
            },
            {
                $project: {
                    userChats: 0 // Exclude the userChats field from the result
                }
            }
        ]);

        res.status(200).json(potentialUsers);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    findUser,
    getUsers,
    getPotentialUsers
}