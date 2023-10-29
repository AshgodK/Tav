const mongoose = require('mongoose')
const etablissementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
const etablissementmodel = mongoose.model('etablissements', etablissementSchema)
module.exports = etablissementmodel;