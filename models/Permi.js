const mongoose = require('mongoose')
const permiSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    validite: {
        type: Date,
        required: true
    },
    etablissement: {
        type: String,
        required: true
    },
    num: {
        type: String,
        required: true
    },
    fonction: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
const permimodel = mongoose.model('permis', permiSchema)
module.exports = permimodel;