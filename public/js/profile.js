function Profile(name, age, description, location, picture) {
    this.name = name;
    this.age = age;
    this.description = description;
    this.location = location;
    this.description = description;
    this.picture = picture;
    this.matches = [];
}
function addMatch(profile, matchedWith)
{
    profile.matches.push(matchedWith);
}

let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt rhoncus ante sollicitudin scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis eu viverra felis. Suspendisse gravida ipsum nec arcu rutrum, quis iaculis velit dignissim. Vivamus non sapien ac lacus pretium elementum. Cras aliquet" 
let dummy = new Profile("Name", "25",loremIpsum, "Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
