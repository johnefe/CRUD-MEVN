const express = require('express');
const router = express.Router(); //crea un objeto para poder definir rutas

const Task = require('../models/Task');


router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});


router.post('/', async(req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json({
        'status': 200
    });
});

router.put('/:id', async(req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        'status': 200
    });
});

router.delete('/:id', async(req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        'status': 200
    });
});

module.exports = router;