const { Router } = require('express');

const logEntry = require('../models/logEntry');

const router = Router();

router.get('/', async (request, response) => {
    try {
        const entries = await logEntry.find();
        response.json(entries);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (request, response, next) => {
    try {
        const entry = new logEntry(request.body);
        const createdEntry = await entry.save();
        response.json(createdEntry);
    } catch (error) {
        if (error.name === 'ValidationError') {
            response.status(422);
        }
        next(error);
    }
});

router.get('/:id', async (request, response, next) => {
    try {
        const entry = await logEntry.findById(request.params.id);
        response.json(entry);
    } catch (error) {
        next(error);
    }
});

router.put('/update/:id', async (request, response, next) => {
    try {
        const entry = await logEntry.findById(request.params.id);
        const updatedEntry = await logEntry.replaceOne(entry, request.body);
        response.json(updatedEntry);
    } catch (error) {
        if (error.name === 'ValidationError') {
            response.status(422);
        }
        next(error);
    }
});

router.delete('/delete/:id', async (request, response, next) => {
    try {
        const entry = await logEntry.deleteOne({ "_id": request.params.id });
        response.json(entry);
    } catch (error) {
        if (error.name === 'CastError') {
            response.status(422);
        }
        next(error);
    }
});

module.exports = router;
