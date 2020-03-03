/* jslint node: true */
/* eslint-env node */
'use strict';

// Require express, socket.io, and vue
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Pick arbitrary port for server
const port = 3000;
app.set('port', (process.env.PORT || port));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from node_modules as vue/
app.use('/vue',
  express.static(path.join(__dirname, '/node_modules/vue/dist/')));
// Serve index.html directly as root page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
// Serve map.html as /map
app.get('/map', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/map.html'));
});
// Serve dispatcher.html as /dispatcher
app.get('/dispatcher', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/dispatcher.html'));
});

app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/admin.html'));
});

app.get('/user', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/user.html'));
});

app.get('/questions-user', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/questions-user.html'));
});


app.get('/user-contacts', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/user-contacts.html'));
});

app.get('/toMeet', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/toMeet.html'));
});

app.get('/waiting', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/waiting.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});
app.get('/createProfile', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/createProfile.html'));
});

// Store data in an object to keep the global namespace clean and
// prepare for multiple instances of data if necessary
function Data() {
    this.afterDateAnswers = {};
}

// Adds after date answers to the "database"
Data.prototype.addAfterDateAnswer = function(afterDateAnswer) {
    this.afterDateAnswers[afterDateAnswer.key] = afterDateAnswer;
}

Data.prototype.getAllAfterDateAnswers = function() {
    return this.afterDateAnswers;
}

const data = new Data();

io.on('connection', function(socket) {
    // Send list of orders and after date answers when a client connects
    socket.emit('initialize', { afterDateAnswers: data.getAllAfterDateAnswers()
               });

    // When a connecter client emits an "addAfterDateAnswer" message
    socket.on('addAfterDateAnwsers', function(answers){
        // Add the data to the "database"
        data.addAfterDateAnswer(answers);
        // Send an updated "database" to all connected clients
        io.emit('currentAfterDateAnswers', {afterDateAnswers: data.getAllAfterDateAnswers()});
    });

             
    

});

/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
