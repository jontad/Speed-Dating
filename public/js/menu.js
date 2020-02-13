function Match(profileA, profileB) {
    this.left = profileA;
    this.right = profileB;
    this.profiles = [profileA, profileB];
}

let img = "https://www.thespruceeats.com/thmb/IVEwZUNTa5XGDFhGtbF8iFaxn3I=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Hamburger-Hot-Dog-58add5f03df78c345bdef6ff.jpg";

let profiles = [
    new Profile("Name 1", "Desc 1", img),
    new Profile("Name 2", "Description 2", img),
    new Profile("Name 3", "Description 3", img),
    new Profile("Name 4", "Description 4", img)
];

let matches = [
    new Match(profiles[0], profiles[1]),
    new Match(profiles[2], profiles[3])
]