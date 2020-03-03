function Profile(name, age, description, location, picture, phoneNumber, email, password, userName) {
    this.name = name;
    this.age = age;
    this.description = description;
    this.location = location;
    this.myProfile = true;
    this.picture = picture;
    this.matches = [];
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.userName = userName;
}

const userProfile = new Vue({
    el: 'main',
    data: {
	allUsers: [],
	name: "",
	password: "",
	fullName: "",
	age: "",
	address: "",
	mail: "",
	number: "",
	description: "",
	userName: "",

	registeredUser: false,
	correctPassword: false,

	Login: "",
    },
    mounted() {
	if (sessionStorage.getItem("userArray")) {
	    try {
		this.allUsers = JSON.parse(sessionStorage.getItem("userArray"));
	    } catch(e) {
		sessionStorage.removeItem("userArray");
	    }
	}
    },
    methods: {
	addUser: function()  {

	    let user = new Profile(this.name, this.age, this.description,
				   this.address, "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
				   this.number, this.mail,
				   this.password, this.userName);

	    this.allUsers.push(user);
	    sessionStorage.setItem("userArray", JSON.stringify(this.allUsers));
	},
	checkUserName: function () {
 	    let userArray = JSON.parse(sessionStorage.getItem("userArray"));  
	    console.log(userArray)

	    if(userArray){
		for (let i = 0; i < userArray.length; i++) {
		    let fullNameCompare = this.userName.localeCompare(userArray[i].name) == 0;
		    let userNameCompare =  this.userName.localeCompare(userArray[i].userName) == 0;
		    let passwordCompare = this.password.localeCompare(userArray[i].password) == 0;
		    
		    if(fullNameCompare || userNameCompare){
			if (passwordCompare) {
			    sessionStorage.setItem("user", JSON.stringify(userArray[i]));
			    document.getElementById("loginInfo").innerHTML = "";
			    correctPassword = true;
			} else {
			    document.getElementById("loginInfo").innerHTML = "Wrong Password";
			}
			this.registeredUser = true;
			break;
		    }
		}
		if (!this.registeredUser) {
		    document.getElementById("loginInfo").innerHTML = "Username not in database";
		}
		registeredUser = false;
	    } else {
		document.getElementById("loginInfo").innerHTML = "Please create an account!";
	    }
	}
    },

    /*
    passwordChecker: function () {
	if (correctPassword) {
            this.Login = "user"    
	}
    },*/
});
