'use strict';
const socket = io();



function Profile(name, age, description, address, picture, phoneNumber, email, password, userName, gender) {
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
    this.wantedMatches = [];
}

let createProfileData = ['Användarnamn', 'Lösenord', 'Förnamn', 'Ålder', 'Bor i', 'Email', 'Telefonnummer'];
let dateDummy = new Profile("Din Date", "ålder", "description", "Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 0, 0);


let q1 = "Vad tyckte du om daten?";
let q2 = "Vad tyckte du om din dates personlighet?";
let q3 = "Tyckte du din dejt var intressant att lyssna på?";
let q4 = "Kan du tänka dig att träffa din dejt igen?";
let qs = [q1, q2, q3, q4];


let dateDummy1 = new Profile ("Din Date1","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0,0,0,"male");

let dateDummy2 = new Profile ("Din Date2","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);

let dateDummy3 = new Profile ("Din Date3","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);


let dateDummy4 = new Profile ("Din Date4","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);
let dummyC = new Profile(dateDummy1.name,
                         dateDummy1.age,
                         dateDummy1.phoneNumber,
                         dateDummy1.email,
                         dateDummy1.picture);

let dummyContacts = [dateDummy1, dateDummy2,dateDummy3];

let meetingUser = null;


const vm = new Vue({
    el: 'main',
    data: {
        profile: "", 

	      profileLocation: "",
        date: dateDummy1,
        tableNo: -1,
        questions: qs,
        editMode: false,
	      editPicture: false,
        myProfile: true, // Tillfälligt för att visa knappar på "ens egen profil"


	      editButtonText: "Redigera profil",
	      editPictureText: "Byt profilbild",
        createProfileData: createProfileData,

	      picture: "",
        userName: "",
        password: "",
        name: "",
        age: "",
        address: "",
        mail: "",
        number: "",
        description: "",
        contacts: [],
	      gender: "",

        currentUser: '',
        allUsers: {},
        tablesMapOrder: [6, 1, 7, 2, 8, 3, 9, 4, 10, 5],
        afterDateAnswers: [0, 0, 0, 0],
        other: '',

    },
    mounted() {
        // When site is mounted, get all users (shitty soulution)
        socket.emit('getUsers');

        var matchesPages = ["/toMeet", "/questions-user"];

        if (matchesPages.includes(window.location.pathname))
            socket.emit('getMatches');

        if (sessionStorage.getItem("currentUser")) {
            this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            this.description = this.currentUser.description;
            this.address = this.currentUser.address;
            this.picture = this.currentUser.picture;
            this.description = this.currentUser.description;
            this.address = this.currentUser.address;
            this.picture = this.currentUser.picture;
	          this.gender = this.currentUser.gender;
        }

        if (sessionStorage.getItem("currentDate")) {
            this.date = JSON.parse(sessionStorage.getItem("currentDate"));
        }
        if (!(location.href.endsWith("/login") || location.href.endsWith("/createProfile")) && this.currentUser == '') {

            console.log('hej');
            window.location.href = "/login";
        }
    },
    created: function () {

        socket.on('currentUsers', function (data) {
            this.allUsers = data.users;
            if (this.currentUser) {
                this.checkMatches();                
            }
	      }.bind(this));
	      
	      
        socket.on('loggedIn', function(data) {
            console.log(data);
            this.currentUser = data;
        }.bind(this));
        /*
        socket.on('newDate', function(data){
            if (data.user.Username == this.currentUser.userName) {
                this.date = data.date;
                this.currentUser.allDates.push(data.date);
                sessionStorage.setItem("currentDate", JSON.stringify(this.currentDate));
                window.location.href='/toMeet';                
            }
        }.bind(this));*/

        socket.on('currentMatches', function (data) {
            var matches = data.matches;
            this.matches = matches;

            meetingUser = null;
            if (!matches) {
                return;
            }

            var currentUser = this.currentUser.name;
            for (var i = 0; i < matches.length; i++)
            {
                var match = matches[i];
                
                if (match.left == null || match.right == null || (match.left.name != currentUser && match.right.name != currentUser))
                    continue;

                var other = match.left.name == currentUser 
                    ? match.right 
                    : match.left;

                this.tableNo = match.tableNo;
                this.currentUser.tableNo = match.tableNo;
                meetingUser = other;

                break;
            }
            this.date = meetingUser;
            if (!this.userNameInArray(this.date.userName, this.currentUser.allDates)) {
                this.currentUser.allDates.push(this.date);                                    
            }
            sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            
        }.bind(this));

        socket.on('startClock', function () {
            window.location.href = '/toMeet';
        }.bind(this));

        socket.on('stopClock', function (data) {
            window.location.href = '/questions-user';
        }.bind(this));
		    
		    socket.on('eventOver', function (data) {
			      console.log("sharedinfo");
			      window.location.href = '/shareInfo';
		    });
    },

    methods: {
        userNameInArray: function(userName, array){
            for (var i = 0; i < array.length; i++) {
                if (userName == array[i].userName) {
                    return true;
                }
            }
            return false;
        },
        checkMatches: function(){

            for (var i = 0; i < this.currentUser.wantedMatches.length; i++) {

                var wantedMatchUsername = this.currentUser.wantedMatches[i].username;
                var wantedMatchProfile = this.allUsers[wantedMatchUsername]; 

                if (this.currentUser in wantedMatchProfile &&
                    !(wantedMatchProfile in this.currentUser.matches)) {
                    this.currentUser.matches.append(wantedMatchProfile);
                }
            }
        },
        createProfile: function () {
            this.addDefaultPicture();

            let newUser = new Profile(this.name, this.age, this.description,
				                              this.address, this.picture,
				                              this.number, this.mail,
				                              this.password, this.userName, this.gender);

            this.currentUser = newUser;

            sessionStorage.setItem("currentUser", JSON.stringify(newUser));
            socket.emit('addNewUser', newUser);
        },
        addDefaultPicture: function () {
            if (!this.picture) {
                this.picture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
        },
        login: function () {
            console.log(this.gender);
            if (this.userName in this.allUsers &&
                this.allUsers[this.userName]['password'] == this.password) {

                this.currentUser = this.allUsers[this.userName];
                this.contacts = this.currentUser.matches;

                socket.emit('loggedIn', this.currentUser);
                sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
                window.location.href = "/user"
            } else {
                console.log("hej");
                document.getElementById("loginInfo").style.display = "block";
            }
        },
        logout: function () {
            // Removes current user from session storage, vue object and server
            sessionStorage.removeItem("currentUser");
            socket.emit('logoutUser', this.currentUser);
            this.currentUser = '';
            window.location.href = '/login';
        },
        range: function (end) {
            return Array(end).fill().map((_, idx) => 1 + idx)
        },

        editProfile: function () {
            this.editMode = !this.editMode;
            if (this.editMode) {
                this.editButtonText = "Spara profil";
            } else {
                this.editButtonText = "Redigera profil";
                this.editUser();
            }
        },
        //user saving new profile
        editUser: function () {
            this.currentUser.description = this.description;
            this.currentUser.address = this.address;

            sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            socket.emit('newArray', this.currentUser);
        },
        editPic: function () {
            this.editPicture = !this.editPicture;
            if (this.editPicture) {
                this.editPictureText = "Spara profilbild";
            } else {
                this.editPictureText = "Byt profilbild";

                this.currentUser.picture = this.picture;
                sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
                socket.emit('newArray', this.currentUser);
            }
        },

        showTableMap: function () {
            document.getElementById("tableMap").style.display = 'inline';
            document.getElementById("table" + this.tableNo.toString()).style.backgroundColor = "green";
        },
        closeTableMap: function () {
            document.getElementById("tableMap").style.display = 'none';
        },
        sendAfterDateQuestions: function () {

            socket.emit('addAfterDateAnwsers',
			                  {
			                      profile: this.currentUser,
			                      date: this.date,
			                      other: this.other,
			                      afterDateAnswers: this.afterDateAnswers,
			                  });

            console.log({
                profile: this.currentUser,
                date: this.date,
                other: this.other,
                afterDateAnswers: this.afterDateAnswers,
            });
            window.location.href = '/user';
        },
        foundDate: function () {
            socket.emit('foundDate', { user: this.currentUser });
            window.location.href = '/waiting';
        },
        shareContact: function(){            
            console.log(this.contacts);
            this.currentUser.wantedMatches.concat(this.contacts);
            this.contacts = [];
            this.currentUser.allDates = [];

            sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            socket.emit('newArray', this.currentUser);
            window.location.href="/lastPage";
        },
    }
});
