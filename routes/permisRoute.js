const express = require('express');
const Permi = require('../models/Permi')
const router = express.Router();






router.post('/add-permi', async function (req, res) {
    try {
        const newpermi = new Permi(req.body);
        await newpermi.save();
        res.send('added permi');
    } catch (error) {
        res.status(500).json(error)

    }

});

router.get('/get-all-permis', async (req, res) => {
    try {
        console.log("object");
        const permis = await Permi.find({});
        console.log("object2");
        res.json(permis); // Use res.json instead of response.send
        console.log("object3");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/edit-permi', async function (req, res) {
    try {
        console.log(req.body.lastname)
        await Permi.findOneAndUpdate({ _id: req.body.permiId, }, req.body.payload)

        res.send('updated');
    } catch (error) {
        res.status(500).json(error)

    }

});

router.post('/delete-permi', async function (req, res) {
    try {
        await Permi.findOneAndDelete({ _id: req.body.permiId })

        res.send('Deleted');
    } catch (error) {
        res.status(500).json(error)

    }

});
module.exports = router;