const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const answerRoute = require('./routes/answerRoute');
const likeRoute = require('./routes/likeRoute');
const authRoute = require('./routes/authRoute');

app.use(express.json());
app.use(cors());
app.use(
  morgan(':date :method :url :status :res[content-length] :response-time ms')
);
app.use(helmet());

app.use('/auth', authRoute);
app.use('/answer', answerRoute);
app.use('/like', likeRoute);

app.use(function (req, res, next) {
  res.status(404).send("404: Sorry can't find that!");
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);
  res.status(err.status || 500).end();
});

module.exports.app = app;
