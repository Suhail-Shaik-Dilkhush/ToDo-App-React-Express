const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
const route = require('./routes/route');

app.use('/api', route);



module.exports = app