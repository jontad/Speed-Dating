'use strict';
const socket = io();

let createProfileData = ['Användarnamn', 'Lösenord','Förnamn', 'Ålder', 'Bor i','Email', 'Telefonnummer'];

let dateDummy = new Profile ("Din Date","ålder",loremIpsum,"Ort", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",0,0);

let q = "question";
let qs = [q,q,q,q];


const vm = new Vue({
    el: 'main',
    data: {
        profile: dummy,
        date: dateDummy,
        questions: qs,
        editMode: false,
        myProfile: true, // Tillfälligt för att visa knappar på "ens egen profil"
        editButtonText: "Redigera profil",
        dummyContacts: dummyContacts,
        createProfileData: createProfileData,
        tablesMapOrder: [6,1,7,2,8,3,9,4,10,5],        
        radioAnswers: [0,0,0,0],
        other: '',
        dateNumber: 0,

       
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
        },
        createProfile: function(){
            window.location.href="/user";
        },
        showTableMap: function(){
            document.getElementById("tableMap").style.display= 'inline';            
        },
        closeTableMap: function(){
            document.getElementById("tableMap").style.display= 'none'; 
        },
        sendAfterDateQuestions: function() {
            
            this.dateNumber = this.dateNumber+1;
            socket.emit('addAfterDateAnwsers',
                        {
                            key: this.dateNumber,
                            profile: this.profile,
                            date: this.date,
                            other: this.other,
                            radioAnswers: this.radioAnswers,
                        });
            
            console.log( {
                key: this.dateNumber,
                profile: this.profile,
                date: this.date,
                other: this.other,
                radioAnswers: this.radioAnswers,
            });
        }        
    }
});


