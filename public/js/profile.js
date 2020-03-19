function Profile(name, age, description, location, picture, phoneNumber, email, gender, password, userName, tableNo) {
    this.name = name;
    this.age = age;
    this.description = description;
    this.location = location;
    this.myProfile = true;
    this.picture = picture;
    this.matches = [];
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.gender = gender;
    this.password = password;
    this.userName = userName;
    this.tableNo = tableNo;
    this.wantedMatches =[];
}

function Contact(name, age, phoneNumber, email, picture) {
    this.name = name;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.picture = picture;
}

function addMatch(profile, matchedWith) {
    profile.matches.push(matchedWith);
}


