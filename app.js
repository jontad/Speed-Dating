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
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});
// Serve map.html as /map
app.get('/map', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/map.html'));
});
// Serve dispatcher.html as /dispatcher
app.get('/dispatcher', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/dispatcher.html'));
});

app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/admin.html'));
});

app.get('/user', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/user.html'));
});

app.get('/questions-user', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/questions-user.html'));
});

app.get('/user-contacts', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/user-contacts.html'));
});

app.get('/toMeet', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/toMeet.html'));
});

app.get('/waiting', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/waiting.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/createProfile', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/createProfile.html'));
});

app.get('/shareInfo', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/shareInfo.html'));
});

app.get('/lastPage', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/lastPage.html'));
});

app.get('/loginAdmin', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/loginAdmin.html'));
});



function Profile(name, age, description, address, picture, phoneNumber, email, password, userName, gender, allContacts) {

    this.name = name;
    this.age = age;
    this.description = description;
    this.address = address;
    this.picture = picture;
    this.matches = [];
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.gender = gender;
    this.allContacts = [];

    this.myProfile = true;
    this.tableNo = 0;
    this.allDates = [];
    
}


// Store data in an object to keep the global namespace clean and
// prepare for multiple instances of data if necessary
function Data() {
    this.orders = {};
    this.users = {};
    this.loggedIn = {};
    this.afterDateAnswers = {};
    this.matches = [];
};

// Adds after date answers to the "database"
Data.prototype.addAfterDateAnswer = function (afterDateAnswer) {
    this.afterDateAnswers[afterDateAnswer.key] = afterDateAnswer;
}

Data.prototype.getAllAfterDateAnswers = function () {
    return this.afterDateAnswers;
}

Data.prototype.addNewUser = function (user) {
    this.users[user.userName] = user;//new Profile(user.name, user.age, user.description, user.address, user.picture, user.number, user.mail, user.password, user.userName);    
};


Data.prototype.getAllUsers = function () {
    return this.users;
}

Data.prototype.addLoggedIn = function (user) {
    this.loggedIn[user.userName] = user;
}

Data.prototype.logoutUser = function (user) {
    delete this.loggedIn[user.userName];
}
Data.prototype.getLoggedInUsers = function () {
    return this.loggedIn;
}

//update array with edited user
Data.prototype.updateArray = function (newUser) {
    delete this.users[newUser.userName];
}

// TODO: Behövs dessa??
Data.prototype.getMatches = function () {
    return this.matches;
}

Data.prototype.setMatches = function (matches) {
    this.matches = matches;
}


const data = new Data();

io.on('connection', function (socket) {
    // Send list of orders when a client connects
    socket.emit('initialize', { afterDateAnswers: data.getAllAfterDateAnswers() });

    // When a connecter client emits an "addAfterDateAnswer" message
    socket.on('addAfterDateAnwsers', function (answers) {
        // Add the data to the "database"
        data.addAfterDateAnswer(answers);
        // Send an updated "database" to all connected clients
        io.emit('currentAfterDateAnswers', { afterDateAnswers: data.getAllAfterDateAnswers() });
    });

    // When a connected client emits an "addOrder" message
    socket.on('addOrder', function (order) {
        data.addOrder(order);
        // send updated info to all connected clients,
        // note the use of io instead of socket
        io.emit('currentQueue', { orders: data.getAllOrders() });
    });

    socket.on('addNewUser', function (user) {
        data.addNewUser(user);
        io.emit('currentUsers', { users: data.getAllUsers() });
    });
    socket.on('getUsers', function (user) {
        io.emit('currentUsers', { users: data.getAllUsers() });
    });
    
    socket.on('getLoggedInUsers', function (x) {
        var users = [];

        var dict = data.getLoggedInUsers();
        for (var key in dict)
            users.push(dict[key]);

        io.emit('currentLoggedIn', { loggedIn: users });
    });

    socket.on('loggedIn', function (user) {
        data.addLoggedIn(user);
        //io.emit('currentLoggedIn', { loggedIn: data.getLoggedInUsers() })
        var users = [];

        var dict = data.getLoggedInUsers();
        for (var key in dict)
            users.push(dict[key]);

        io.emit('currentLoggedIn', { loggedIn: users });;
    });
    socket.on('logoutUser', function (user) {
        data.logoutUser(user);
        //io.emit('currentLoggedIn', { loggedIn: data.getLoggedInUsers() });
        var users = [];

        var dict = data.getLoggedInUsers();
        for (var key in dict)
            users.push(dict[key]);

        io.emit('currentLoggedIn', { loggedIn: users });
    });

    socket.on('newArray', function (user) {
        data.updateArray(user);
        io.emit('currentUsers', { users: data.getAllUsers() });
    });
    socket.on('stopClock', function (user) {
        io.emit('stopClock');
    });
    
    socket.on('startClock', function (user) {
        io.emit('startClock');
    });
	
	socket.on('eventOver', function (user) {
		io.emit('eventOver');
	}); 

    socket.on('setMatches', function (matches) {
        data.setMatches(matches);
    });

    socket.on('getMatches', function (matches) {
        io.emit('currentMatches', { matches: data.getMatches() });
    });
    
    socket.on('makeContactWith', function (matches) {
        // Update all user array
        //io.emit('currentMatches', { matches: data.getMatches() });
    });
});

/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});

