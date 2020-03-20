
const socket = io();
var loggedInUsers = {};
const vm = new Vue({
    el: 'main',
    data: {
	eventState: 0,
  	info: "hej",
    tables: 10,
	found: {},
	currentUsers: {}, //conatins all logged in users  
    afterDateAnswers: {}, // Contains the data received from user-questions

    },
    methods: {
        range: function(end) {
            return Array(end).fill().map((_, idx) => 1 + idx)
        },
        changeState: function (){
			      let time = (document.getElementById('time').value) * 60;
			      if(time > 0 && this.eventState < 4) {
				        this.eventState += 1;
			      }
		    },
        createDummyUsers: function(){
            for (var i = 0; i < 20-this.currentUsers.length; i++) {
                var gender = i % 2 == 0 ? 'male' : 'female';
                var newUser = new Profile
                ('Namn'+i.toString(),
                 18+i,
                 'Description'+i.toString(),
                 'Stad'+i.toString(),
                 "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
                 i,
                 'Namn'+ i.toString()+'@email.com',
                 gender,
                 'password',
                 'username' + i.toString(),
                 -1);
                this.currentUsers[newUser.userName] = newUser;
                socket.emit('addNewUser', newUser);
                socket.emit('loggedIn', newUser);
            }
        },
		shareInfo: function (){
			this.eventState += 1;
			socket.emit('eventOver');	
		},
    },
    mounted() {
        socket.emit('getLoggedInUsers');
    },
    created: function() {
        socket.on('initialize', function(data) {
            this.afterDateAnswers = data.afterDateAnswers;
        }.bind(this));

        socket.on('currentAfterDateAnswers', function(data) {
            this.afterDateAnswers = data.afterDateAnswers;
        }.bind(this));

		
		socket.on('foundDate', function(data) {	
			this.found = data.user.tableNo;
			let tables = document.getElementsByClassName('table');
			tables[this.found-1].style.backgroundColor = "green";
			console.log("hej hej hej found date hej hej");
		}.bind(this));

		    
        socket.on('currentLoggedIn', function (data) {
            loggedInUsers = data.loggedIn;
            this.currentUsers = data.loggedIn;

            setup(loggedInUsers);
        }.bind(this));

    }
});


