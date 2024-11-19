const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
},
    {
        // para crear los campos de createdAt y updatedAt
        timestamps: true
    }
)

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = {Subject}