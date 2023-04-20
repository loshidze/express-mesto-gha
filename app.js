const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '644011eeb89da2f0f4d14c8a',
  };

  next();
});

app.use(router);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`start server ${PORT}`);
});
