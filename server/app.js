const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');
require('dotenv').load();

const app = express();

const client = redis.createClient(process.env.REACT_APP_REDIS);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

client.on('connect', () => {
  console.log('redis connect');
});

app.post('/login', (req, res) => {
  client.hgetall(req.body.username, (err, reply) => {
    if (reply) {
      if (reply.password !== req.body.password) {
        res.status(404);
        res.end('error')
      } else {
        res.end(JSON.stringify(reply));
      }
    } else {
      res.status(404);
      res.end('error');
    }
  });
});

app.post('/signup', (req, res) => {
  client.hgetall(req.body.username, (err, reply) => {
    if (reply) {
      res.status(404);
      res.end('error');
    } else {
      let favorites = []
      favorites = JSON.stringify(favorites);
      client.HMSET(req.body.username, {
        password: req.body.password,
        favorites,
      });
      res.end('good');
    }
  });
});

app.post('/add', (req, res) => {
  client.hgetall(req.body.username, (err, reply) => {
    if (reply) {
      const newAdd = {
        name: req.body.newAdd.name,
        placeImg: req.body.newAdd.placeImg,
      }
      let arr = JSON.parse(reply.favorites);
      console.log('new add', newAdd)
      arr.push(newAdd);
      arr = JSON.stringify(arr);
      client.HMSET(req.body.username, {
        favorites: arr,
      });
      res.end('saved ok');
    }
  });
});

module.exports = app;
