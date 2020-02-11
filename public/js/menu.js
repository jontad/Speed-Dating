function Match(profileA, profileB) {
    this.left = profileA;
    this.right = profileB;
    this.profiles = [profileA, profileB];
}

let profiles = [
    new Profile("Name 1", "Desc 1"),
    new Profile("Name 2", "Description 2"),
    new Profile("Name 3", "Description 3"),
    new Profile("Name 4", "Description 4")
];

let matches = [
    new Match(profiles[0], profiles[1]),
    new Match(profiles[2], profiles[3])
]