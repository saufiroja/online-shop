require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

// connection database
require('./models/sequelize');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

// router

// listen port
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`connect on port http://localhost:${PORT}`);
});
