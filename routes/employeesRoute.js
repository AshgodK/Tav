const express = require('express');
const Employee = require('../models/Employee')
const router = express.Router();






router.post('/add-employee', async function (req, res) {
    try {
        const newemployee = new Employee(req.body);
        await newemployee.save();
        res.send('added');
    } catch (error) {
        res.status(500).json(error)

    }

});
router.get('/get-all-employees', async (req, res) => {
    try {
        console.log("object");
        const employees = await Employee.find({});
        console.log("object2");
        res.json(employees); // Use res.json instead of response.send
        console.log("object3");
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/get-employee-by-cin', async (req, res) => {
    try {
        const employees = await Employee.findOne({ cin: req.query.cin });
        res.json(employees); // Use res.json instead of response.send
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/edit-employee', async function (req, res) {
    try {
        await Employee.findOneAndUpdate({ _id: req.body.employeeId }, req.body.payload)

        res.send('updated');
    } catch (error) {
        res.status(500).json(error)

    }

});

router.post('/delete-employee', async function (req, res) {
    try {
        await Employee.findOneAndDelete({ _id: req.body.employeeId })

        res.send('Deleted');
    } catch (error) {
        res.status(500).json(error)

    }

});

module.exports = router;