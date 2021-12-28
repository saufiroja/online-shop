require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// router import
const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router');
const adminRouter = require('./routers/admin.router');
const receiptRouter = require('./routers/receipt.router');

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
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/account', receiptRouter);

// error handling
app.use((err, req, res, next) => {
  const { message, code = 500, error = 'internal server error' } = err;
  return res.status(code).json({
    message,
    code,
    error,
  });
});

// listen port
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`connect on port http://localhost:${PORT}`);
});
