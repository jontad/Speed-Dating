function Profile(name, description, image) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.matches = [];
}

function addMatch(profile, matchedWith)
{
    profile.matches.push(matchedWith);
}