const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const answerRoute = require('./routes/answerRoute');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/answer', answerRoute);

app.use(function (req, res, next) {
  res.status(404).send("404: Sorry can't find that!");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.end('error');
});

module.exports.app = app;
