const vm = new Vue({
    el: 'main',
    data: {
        profile: dummy,
        questions: dummyQuestions,
        editMode: false,
        myProfile: true, // Tillfälligt för att visa knappar på "ens egen profil"
        editButtonText: "Redigera profil",
        dummyContacts: dummyContacts,
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
            }                
        }
    }
});
