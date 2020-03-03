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
    },
    methods: {
	addUser: function()  {

	    let user = new Profile(this.name, this.age, this.description,
				   this.address, "tempPicture",
				   this.number, this.mail,
				   this.password, this.userName);

	    this.allUsers.push(user);
	    sessionStorage.setItem("userArray", JSON.stringify(this.allUsers));
	},
	checkUserName: function () {
	    let userArray = JSON.parse(sessionStorage.getItem("userArray"));
	    correctPassword = false;
	    
	    for (let i = 0; i < userArray.length; i++) {
		let fullNameComparison = this.userName.localeCompare(userArray[i].name) == 0;
		let userNameComparison =  this.userName.localeCompare(userArray[i].userName) == 0;
		let passwordComparison = this.password.localeCompare(userArray[i].password) == 0;
		
		if(fullNameComparison || userNameComparison){
		    if (passwordComparison) {
			sessionStorage.setItem("user", JSON.stringify(userArray[i]));
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
	}
    },
});
