const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
    },
    school_year: {
        type: Number,
        required: true,
        min: 1, // minimo puede estar en primer año
        max: 6 // maximo en sexto año
    },
    birthdate: {
        type: Date,
        required: true,
    },
},
    {
        // para crear los campos de createdAt y updatedAt
        timestamps: true
    }
)

const Student = mongoose.model('Student', studentSchema)

module.exports = {Student}