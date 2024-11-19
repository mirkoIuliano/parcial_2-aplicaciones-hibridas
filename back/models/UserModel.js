const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 9,
    },
}, 
    {
        // para crear los campos de createdAt y updatedAt
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = {User};