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


const vm = new Vue({
    el: 'main',
    data: {
        profile: "", 
	      profileLocation: "",
	      
        date: dateDummy,
        questions: ["question"],

	      editMode: false,
        myProfile: true, // Tillfälligt för att visa knappar på "ens egen profil"

	      editButtonText: "Redigera profil",
        dummyContacts: [],
        createProfileData: createProfileData,

        userName: "",
        password: "",
        name: "",
        age: "",
        address: "",
        mail: "",
        number: "",
        description: "",

        currentUser: '',
        allUsers: {},
        
        
    },
    mounted() {
        // When site is mounted, get all users (shitty soulution)
        socket.emit('getUsers');

        if (sessionStorage.getItem("currentUserName")){                                    
            this.currentUser = JSON.parse(sessionStorage.getItem("currentUserName"));
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
				                              this.address, "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
				                              this.number, this.mail,
				                              this.password, this.userName); 

            this.currentUser = newUser;

            sessionStorage.setItem("currentUser", JSON.stringify(newUser));            

            socket.emit('addNewUser', newUser);
            window.address.href="/user";
            
        },        
        login: function(){
            console.log(this.userName + this.password);
            if(this.userName in this.allUsers &&
               this.allUsers[this.userName]['password'] == this.password) {
                this.currentUser = this.allUsers[this.userName];
                socket.emit('loggedIn', this.currentUser);
                sessionStorage.setItem("currentUserName", JSON.stringify(this.currentUser));
                window.location.href="/user"
            } else {
                console.log("hej");
                document.getElementById("loginInfo").style.display = "block";
            }
        },
        range: function(end) {
            return Array(end).fill().map((_, idx) => 1 + idx)
        },
	      editProfile: function(){
	          this.editMode = !this.editMode;
            if(this.editMode){
                this.editButtonText = "Spara profil";
                this.description = this.currentUser.description;
                this.address = this.currentUser.address;
            }              
            else {
                this.editButtonText = "Redigera profil";
		            this.editUser();
	          }
	      },
	      //user saving new profile
	      editUser: function(){
            /*
            let userProfile = new Profile(this.profile.name, this.profile.age,
					                                this.profileDesc, this.profileLocation, this.profile.picture,
					                                this.profile.phoneNumber, this.profile.email,
					                                this.profile.password, this.profile.userName);*/		

	          //sessionStorage.setItem("user", JSON.stringify(userProfile));
	          //this.inputUserInArray(userProfile);

            // TODO: Måste skicka ersätta den gamla profilen med den nya i app.js och skicka ut användarlistan på nytt.
            //       Kanske spara currentUser på nytt i sessionStorage?
        },     
    }

});



