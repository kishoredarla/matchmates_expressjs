import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import autenticationRoute from './routes/authenticationRoutes.js';
import { db } from './config/dbConfig.js';
import userHobbiesRoutes from './routes/userHobbiesRoutes.js';
import connectionRequestRoutes from './routes/connectionRequestRoutes.js';
import myActivitiesRoutes from './routes/myActivitiesRoutes.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('ACCESS-CONTROL-ALLOW-METHODS', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/matchmates/hobbies', userHobbiesRoutes);

app.use('/matchmates/autenticate', autenticationRoute);
app.use('/matchmates/connection-request', connectionRequestRoutes);
app.use('/matchmates/myactivities', myActivitiesRoutes);

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server connected to port ${PORT}`);
});
