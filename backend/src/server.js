import express from 'express';
import signale from 'signale';
import './db/connectMongo.js';  // MongoDB connection
import firstrouter from './router/firstRouter.js';
import secondRouter from './router/secondRouter.js';
import thirdRouter from './router/thirdRouter.js';
import protectedRouter from './router/protectedRouter.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// CORS setup to allow frontend to access the API
app.use(cors({
    origin: 'http://localhost:3001', // React app is running on port 3001
    methods: ['GET', 'POST', 'DELETE'],  
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
app.listen(3000, () => {
    signale.success('Server running on port 3000');
});
