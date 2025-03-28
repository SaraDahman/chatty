const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be more than 3 characters'],
        maxlength: [20, 'Name must be less than 20 characters']
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required'],
        unique: [true, 'Email is already in use'],
    },
    password: {
        type: String,
        // required: [true, 'Password is required'],
        minlength: [7, 'Password must be more than 7 characters'],
        maxlength: [100, 'Password must be less than 100 characters']
    }
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;