import express from 'express';
import cors from 'cors';

import route from './src/route/index.js';
import db from './src/model/index.js';
import './src/firebase/config.js';
import './src/utils/constants.js'

const app = express();

app.use(express.json());
app.use(cors());

route(app);

db.sequelize.sync().then((rs) => {
    app.listen(3001, () => {
        console.log('App listening at localhost:3001');
    });
}).catch((err) => {
    console.log('Error while connecting to database: ', err.message);
});