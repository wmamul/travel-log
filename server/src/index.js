const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('../api/logs');


const app = express();

mongoose.connect(process.env.DATABASE_URI,  {
    useNewUrlParser: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.get('/', (request, response) => {
    res.json({
        message: 'Hello World!',
    });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log('Listening on http://localhost:' + port);
});
