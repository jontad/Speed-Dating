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

let createProfileData = ['Användarnamn', 'Lösenord','Förnamn', 'Ålder', 'Bor i','Email', 'Telefonnummer'];
let dateDummy = new Profile ("Din Date","ålder","description","Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);


let q = "question";
let qs = [q,q,q,q];


const vm = new Vue({
    el: 'main',
    data: {
        profile: "", 
	profileLocation: "",
	
        date: dateDummy,

        questions: ["question"],
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
        radioAnswers: [0,0,0,0],
        other: '',
        dateNumber: 0,        
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

        if (!(location.href.endsWith("/login") || location.href.endsWith("/createProfile"))&& this.currentUser == '') {
            console.log('hej');
            window.location.href="/login";
        }
    },
    created: function() {

        socket.on('currentUsers', function(data) {
            this.allUsers = data.users;
	}.bind(this));
	
	
        socket.on('loggedIn', function(data) {
            console.log(data);
            this.currentUser = data;
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
            
            this.dateNumber = this.dateNumber+1;
            socket.emit('addAfterDateAnwsers',
                        {
                            key: this.dateNumber,
                            profile: this.profile,
                            date: this.date,
                            other: this.other,
                            radioAnswers: this.radioAnswers,
                        });
            
            console.log( {
                key: this.dateNumber,
                profile: this.profile,
                date: this.date,
                other: this.other,
                radioAnswers: this.radioAnswers,
            });
        }        
    }
});
