const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    fonction: {
        type: String,
        required: true
    }
})
const employeemodel = mongoose.model('Employees', employeeSchema)
module.exports = employeemodel;