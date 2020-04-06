function Profile(name, age, description, address, picture, phoneNumber, email, gender, password, userName, tableNo, afterDateAnswers) {
    this.name = name;
    this.age = age;
    this.description = description;
    this.address = address;
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
    this.afterDateAnswers = afterDateAnswers;
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


