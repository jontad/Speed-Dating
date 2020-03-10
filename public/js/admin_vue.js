const socket = io();
var loggedInUsers = {};
const vm = new Vue({
    el: 'main',
    data: {
	eventState: 0,
	info: "hej",
    tables: 10,
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
    },
    created: function() {
        socket.on('initialize', function(data) {
            this.afterDateAnswers = data.afterDateAnswers;
        }.bind(this));

        socket.on('currentAfterDateAnswers', function(data) {
            this.afterDateAnswers = data.afterDateAnswers;
        }.bind(this));
		
		socket.on('currentLoggedIn', function(data) {
			console.log(data.loggedIn);
			loggedInUsers = data.loggedIn;
			this.currentUsers = data.loggedIn;	
		}.bind(this));
    }
});

  
