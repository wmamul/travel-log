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
        console.log(request.body);
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

module.exports = router;
