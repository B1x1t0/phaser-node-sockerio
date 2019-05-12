import db from './db/db';
import bodyParser from 'body-parser';

var express = require('express')
  , http = require('http');
var app = express();

var server = http.createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

require('./js/api')(app);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', function (socket) {
    console.log('new player connected');
  });

const PORT = 8081;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});