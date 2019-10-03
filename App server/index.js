require('dotenv').config();
require('./config');
const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// var cors = require('cors');
const app = express();
const routes = require('./routes');
const constant = require('./constants');
const jwtAuth = require('./middleware/jwtAuth');
// const multer = require('multer');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const server = http.Server(app);
require('./realtime/socket').init(server, {
  cookie: false,
  pingTimeout: 5000,
  pingInterval: 1000,
});

app.use((req, res, next) => {
  const socketChat = require('./realtime/socket').get('chat');
  // const socketNotification = require('./realtime/socket').get('notifications');
  // req.socketNotification = socketNotification;
  req.socketChat = socketChat;

  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(jwtAuth);
app.use(routes);

mongoose.connect(constant.MONGODB_URL, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  const PORT = process.env.SERVER_POST || 3000;

  server.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});
