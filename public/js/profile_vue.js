'use strict';
const socket = io();


function Profile(name, age, description, address, picture, phoneNumber, email, password, userName, allContacts) {
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
    this.allDates = [];
    this.allContacts = [];
    
}

let createProfileData = ['Användarnamn', 'Lösenord','Förnamn', 'Ålder', 'Bor i','Email', 'Telefonnummer'];
let dateDummy = new Profile ("Din Date","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);


let q1 = "Fråga1";
let q2 = "Fråga2";
let q3 = "Fråga3";
let q4 = "Fråga4";
let qs = [q1,q2,q3,q4];

let dateDummy1 = new Profile ("Din Date","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);

let dateDummy2 = new Profile ("Din Date","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);

let dateDummy3 = new Profile ("Din Date","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);

let dateDummy4 = new Profile ("Din Date","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);


const vm = new Vue({
    el: 'main',
    data: {
        profile: "", 
	      profileLocation: "",
	      
        date: dateDummy,

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
        
        currentUser: '',
        allUsers: {},
        tablesMapOrder: [6,1,7,2,8,3,9,4,10,5],        
        afterDateAnswers: [0,0,0,0],
        other: '',
        dummy: [dateDummy1, dateDummy2, dateDummy3],
        dummyProfile: dateDummy1,
    },
    mounted() {
        // When site is mounted, get all users (shitty soulution)
        socket.emit('getUsers');
	      
        if (sessionStorage.getItem("currentUserName")){                                    
            this.currentUser = JSON.parse(sessionStorage.getItem("currentUserName"));
	          this.description = this.currentUser.description;
	          this.address = this.currentUser.address;
	          this.picture = this.currentUser.picture;
        }

        if (sessionStorage.getItem("currentDate")){                                    
            this.currentDate = JSON.parse(sessionStorage.getItem("currentDate"));
        }
        if (!(location.href.endsWith("/login") || location.href.endsWith("/createProfile"))&& this.currentUser == '') {

            console.log('hej');
            window.location.href="/login";
        }
        //change this to currentUser
        this.dummyProfile.allDates = this.dummy;
    },
    created: function() {

        socket.on('currentUsers', function(data) {
            this.allUsers = data.users;
	      }.bind(this));
	      
	      
        socket.on('loggedIn', function(data) {
            console.log(data);
            this.currentUser = data;
        }.bind(this));
        
        socket.on('newDate', function(data){
            if (data.user.Username == this.currentUser.userName) {
                this.date = data.date;
                sessionStorage.setItem("currentDate", JSON.stringify(this.currentDate));
                this.currentUser.allDates.push(data.date);
                window.location.href='/toMeet';                
            }
        }.bind(this));

        socket.on('startClock', function(data){
            window.location.href='/toMeet';
        }.bind(this));

        socket.on('stopClock', function(data){
            window.location.href='/questions-user.html';
        }.bind(this));

    },
    
    methods: {        
        createProfile: function(){
            let newUser = new Profile(this.name, this.age, this.description,
				                              this.address, this.picture,
				                              this.number, this.mail,
				                              this.password, this.userName); 

            this.currentUser = newUser;
	          
            sessionStorage.setItem("currentUser", JSON.stringify(newUser));            
            socket.emit('addNewUser', newUser);
            
        },        
        login: function(){
            console.log(this.userName + this.password);
            if(this.userName in this.allUsers &&
               this.allUsers[this.userName]['password'] == this.password) {

                this.currentUser = this.allUsers[this.userName];
                this.contacts = this.currentUser.matches;
				        console.log("hej");
                socket.emit('loggedIn', this.currentUser);
                sessionStorage.setItem("currentUserName", JSON.stringify(this.currentUser));
                window.location.href="/user"
            } else {
                console.log("hej");
                document.getElementById("loginInfo").style.display = "block";
            }
        },
        logout: function(){
            // Removes current user from session storage, vue object and server
            sessionStorage.removeItem("currentUserName");
            this.currentUser = '';
            socket.emit('logoutUser', currentUser);
            window.location.href='/login';
            
        },
        range: function(end) {
            return Array(end).fill().map((_, idx) => 1 + idx)
        },
	      editProfile: function(){
	          this.editMode = !this.editMode;
            if(this.editMode){
                this.editButtonText = "Spara profil";
            } else {
                this.editButtonText = "Redigera profil";
		            this.editUser();
	          }
	      },
	      //user saving new profile
	      editUser: function(){
	          this.currentUser.description = this.description;
	          this.currentUser.address = this.address;

	          sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
	          socket.emit('newArray', this.currentUser);	    
        },
	      editPic: function(){
	          this.editPicture = !this.editPicture;
            if(this.editPicture){
                this.editPictureText = "Spara profilbild";
	          } else {
               	this.editPictureText = "Byt profilbild";

		            this.currentUser.picture = this.picture;
		            sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
		            socket.emit('newArray', this.currentUser);	    
	          }
	      },

        showTableMap: function(){
            document.getElementById("tableMap").style.display= 'inline';            
        },
        closeTableMap: function(){
            document.getElementById("tableMap").style.display= 'none'; 
        },
        sendAfterDateQuestions: function() {
            
            socket.emit('addAfterDateAnwsers',
                        {
                            profile: this.currentUser,
                            date: this.date,
                            other: this.other,
                            afterDateAnswers: this.afterDateAnswers,
                        });
            
            console.log( {
                profile: this.currentUser,
                date: this.date,
                other: this.other,
                afterDateAnswers: this.afterDateAnswers,
            });
            window.location.href='/user';
        },
        foundDate: function(){
            socket.emit('foundDate', {user: this.currentUser, date: this.date});
            window.location.href='/waiting';            
        },
        shareContact: function(){
            let i = 0;
            for(i = 0; i < 3; i++){
                console.log(this.dummyProfile.mataches[i]);
                var match = this.dummyProfile.matches[i];
                var newContact = new Contact(match.name,
                                             match.age,
                                             match.phoneNumber,
                                             match.email,
                                             match.picture);
                this.dummyProfile.allContacts[i] = newContact;
            }
        },
    }
});
