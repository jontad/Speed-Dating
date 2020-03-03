let createProfileData = ['Användarnamn', 'Lösenord','Förnamn', 'Ålder', 'Bor i','Email', 'Telefonnummer'];
let dateDummy = new Profile ("Din Date","ålder",loremIpsum,"Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);



const vm = new Vue({
    el: 'main',
    data: {
        profile: "", 
	profileDesc: "",
	profileLocation: "",
	
        date: dateDummy,
        questions: dummyQuestions,

	editMode: false,
        myProfile: true, // Tillfälligt för att visa knappar på "ens egen profil"

	editButtonText: "Redigera profil",
        dummyContacts: dummyContacts,
        createProfileData: createProfileData,
    },
    mounted() {
	if (sessionStorage.getItem("user")) {
	    try {
		this.profile = JSON.parse(sessionStorage.getItem("user"));
		this.profileDesc = this.profile.description;
		this.profileLocation = this.profile.location;
	    } catch(e) {
		sessionStorage.removeItem("user");
	    }
	}
    },
    methods: {
        range: function(end) {
            return Array(end).fill().map((_, idx) => 1 + idx)
        },
	editProfile: function(){
	    this.editMode = !this.editMode;
            if(this.editMode){
                this.editButtonText = "Spara profil";		
            }              
            else {
                this.editButtonText = "Redigera profil";
		let userProfile = new Profile(this.profile.name, this.profile.age,
					      this.profileDesc, this.profileLocation, this.profile.picture,
					      this.profile.phoneNumber, this.profile.email,
					      this.profile.password, this.profile.userName);		
		sessionStorage.setItem("user", JSON.stringify(userProfile));

		let userArray = JSON.parse(sessionStorage.getItem("userArray"));  
		for (var i = 0; i < userArray.length; i++) {
		    let userNameCompare = userArray[i].userName.localeCompare(userProfile.userName) == 0;
		    if (userNameCompare) {
			userArray[i] = userProfile;
			break;
		    }
		}
		sessionStorage.setItem("userArray", JSON.stringify(userArray));
	    }                
        },
        createProfile: function(){
            window.location.href="/user";
            console.log("hej");
        },
    }
});
