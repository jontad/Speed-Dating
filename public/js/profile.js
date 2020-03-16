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


/*
let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt rhoncus ante sollicitudin scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis eu viverra felis. Suspendisse gravida ipsum nec arcu rutrum, quis iaculis velit dignissim. Vivamus non sapien ac lacus pretium elementum. Cras aliquet";



let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt rhoncus ante sollicitudin scelerisque. Pellentesque habitant morb tristique senectus et netus et malesuada fames ac turpis egestas. Duis eu viverra felis. Suspendisse gravida ipsum nec arcu rutrum, quis iaculis velit dignissim. Vivamus non sapien ac lacus pretium elementum. Cras aliquet";

let dummy = new Profile("Namn",
                        "ålder",
                        loremIpsum,
                        "Ort",
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                        123456789,
                       "mail@mail.se");

let dummyC = new Contact(dummy.name,
                         dummy.age,
                         dummy.phoneNumber,
                         dummy.email,
                         dummy.picture);
let dummyContacts = [dummyC, dummyC, dummyC,dummyC, dummyC, dummyC,dummyC, dummyC, dummyC,dummyC, dummyC, dummyC,dummyC, dummyC, dummyC];


let firstProfile = new Profile("Anders",
                               23,
                               "Giller färgen grå",
                               "Täby",
                               "https://image.shutterstock.com/z/stock-vector-male-silhouette-avatar-profile-picture-199246382.jpg",
                               123456789,
                               "mail@mail.se");

let secondProfile = new Profile("Tommy",
                               30,
                               "Giller färgen blå",
                               "Arboga",
                               "https://image.shutterstock.com/z/stock-vector-male-silhouette-avatar-profile-picture-199246382.jpg",
                               123456789,
                               "mail@mail.se");

let thirdProfile = new Profile("Karl",
                               28,
                               "Giller färgen grå",
                               "Lund",
                               "https://image.shutterstock.com/z/stock-vector-male-silhouette-avatar-profile-picture-199246382.jpg",
                               123456789,
                               "mail@mail.se");


let firstContact = new Contact(firstProfile.name,
                               firstProfile.age,
                               firstProfile.phoneNumber,
                               firstProfile.email,
                               firstProfile.picture);

let secondContact = new Contact(secondProfile.name,
                                secondProfile.age,
                                secondProfile.phoneNumber,
                                secondProfile.email,
                                secondProfile.picture);

let thirdContact = new Contact(thirdProfile.name,
                               thirdProfile.age,
                               thirdProfile.phoneNumber,
                               thirdProfile.email,
                               thirdProfile.picture);

let shareContacts = [firstContact, secondContact, thirdContact];

=======
*/

