const mongoose = require('mongoose');
const { app } = require('./app.js');

require('dotenv').config();

const mongoDBString = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.cqebn.gcp.mongodb.net/${process.env.DB_name}?retryWrites=true&w=majority`;
// const mongoDBString = `mongodb://localhost:27017/folkestemmen`;

mongoose.connect(
  mongoDBString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  app.listen(process.env.PORT || 4000, () =>
    console.log(`App is running at port: ${process.env.PORT || 4000}`)
  )
);
