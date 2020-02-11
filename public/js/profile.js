function Profile(name, description) {
    this.name = name;
    this.description = description;
    this.matches = [];
}

function addMatch(profile, matchedWith)
{
    profile.matches.push(matchedWith);
}