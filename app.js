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
// app.use('/tag', tagRoute);

app.use(function (req, res, next) {
  res.status(404).send("404: Sorry can't find that!");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err);
  res.end(err.message);
});

module.exports.app = app;
