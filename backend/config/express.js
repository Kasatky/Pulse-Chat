const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const sessionConfig = require('./sessionConfig');
// const getUser = require('../middlewares/getUser');

function expressConfig(app) {

  app.use(session(sessionConfig));

  app.use(morgan('dev'));

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());



  // app.use(getUser);
}

module.exports = expressConfig;
