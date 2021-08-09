const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const answerRoute = require('./routes/answerRoute');
const tagRoute = require('./routes/tagRoute');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/answer', answerRoute);
app.use('/tag', tagRoute);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports.app = app;
