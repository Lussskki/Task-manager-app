import express from 'express';
import signale from 'signale';

import './db/connectMongo.js';  // MongoDB connection

import firstrouter from './router/firstRouter.js';
import secondRouter from './router/secondRouter.js';
import thirdRouter from './router/thirdRouter.js';
import protectedRouter from './router/protectedRouter.js';

import bodyParser from 'body-parser';
import cors from 'cors';

import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

// Use environment variables for CORS configuration
const allowedOrigin = process.env.FRONTEND_URL || PORT;
const allowedMethods = process.env.ALLOWED_METHODS ? process.env.ALLOWED_METHODS.split(',') : ['GET', 'POST', 'DELETE'];


// CORS setup to allow frontend to access the API
app.use(cors({
    origin: allowedOrigin,
    methods: allowedMethods
}));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(express.json())

// Use your defined routes
app.use('/api/signup', firstrouter);
app.use('/api/login', secondRouter);
app.use('/api/addInfo', thirdRouter);
app.use('/api/profile', protectedRouter);

// Start the server
app.listen(PORT, () => {
    signale.success(`Server running on port ${PORT}`);
});
