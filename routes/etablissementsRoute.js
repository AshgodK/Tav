const express = require('express');
const Etablissement = require('../models/Etablissement')
const router = express.Router();






router.post('/add-etablissement', async function (req, res) {
    try {
        const newetablissement = new Etablissement(req.body);
        await newetablissement.save();
        res.send('added etablissement');
    } catch (error) {
        res.status(500).json(error)

    }

});

router.get('/get-all-etablissements', async (req, res) => {
    try {
        console.log("object");
        const etablissements = await Etablissement.find({});
        console.log("object2");
        res.json(etablissements); // Use res.json instead of response.send
        console.log("object3");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/edit-etablissement', async function (req, res) {
    try {
        await Etablissement.findOneAndUpdate({ _id: req.body.etablissementId }, req.body.payload)

        res.send('updated');
    } catch (error) {
        res.status(500).json(error)

    }

});

router.post('/delete-etablissement', async function (req, res) {
    try {
        await Etablissement.findOneAndDelete({ _id: req.body.etablissementId })

        res.send('Deleted');
    } catch (error) {
        res.status(500).json(error)

    }

});
module.exports = router;