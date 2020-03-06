
let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt rhoncus ante sollicitudin scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis eu viverra felis. Suspendisse gravida ipsum nec arcu rutrum, quis iaculis velit dignissim. Vivamus non sapien ac lacus pretium elementum. Cras aliquet";

'use strict';
const socket = io();


function Profile(name, age, description, address, picture, phoneNumber, email, password, userName) {
    this.name = name;
    this.age = age;
    this.description = description;
    this.address = address;
    this.myProfile = true;
    this.picture = picture;
    this.matches = [];
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.userName = userName;
}


const vm = new Vue({
    el: 'main',
    data: {
	info: loremIpsum,
        tables: 10,
        afterDateAnswers: {}, // Contains the data received from user-questions
	allUsers: {},
    },
    created: function() {
        socket.on('initialize', function(data) {
            this.afterDateAnswers = data.afterDateAnswers;
        }.bind(this));
	
        socket.on('currentAfterDateAnswers', function(data) {
            this.afterDateAnswers = data.afterDateAnswers;
        }.bind(this));
	
	socket.on('currentUsers', function(data) {
            this.allUsers = data.users;
        }.bind(this));
    },
    methods: {
        range: function(end) {
            return Array(end).fill().map((_, idx) => 1 + idx)
	},
    },
    
});

  
