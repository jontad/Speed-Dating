var males = [];
var females = [];
var matches = [];
let tableNo = 1;

function setup(loggedInUsers) {
    var box = document.getElementById("matchPanelGrid");

    box.innerHTML = "";

    males = [];
    females = [];
    tableNo = 1;

    for (var i = 0; i < loggedInUsers.length; i++) {
        // name, age, description, location, picture, phoneNumber, email, gender, password, userName, tableNo

        var user = loggedInUsers[i];
        var userProfile = new Profile(user.name, user.age, user.description, user.location, user.picture, user.phoneNumber, user.email, user.gender.toLowerCase(), user.password, user.userName, -1);

        if (userProfile.gender === "male")
            males.push(userProfile);
        else
            females.push(userProfile);
    }

    matches = [];
    matchAlgorithm(males, females, matches);

    matches.forEach(function (match) {
        addMatch(match);
    });
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Uses Math.random to match people
function matchAlgorithm(males, females, matches) {
    shuffle(females);

    for (var i = 0; i < Math.max(males.length, females.length); i++) {
        var male = i >= males.length ? null : males[i];
        var female = i >= females.length ? null : females[i];

        if (male != null)
            male.tableNo = i + 1; //assign table to pair

        if (female != null)
            female.tableNo = i + 1;

        matches.push(new Match(male, female));
    }
}

function addProfile(profile, gender) {
    var box = document.getElementById("matchPanelGrid");
    var div = document.createElement("div");

    if (profile != null) {
        var img = document.createElement("img");
        var p = document.createElement("p");

        p.id = profile.name;
        p.innerText = profile.name;
        p.setAttribute("id", profile.name);
        p.classList.add("column-child");

        div.setAttribute("onclick", "openPopup(this)");
        /*
          function () {
          //alert(this.querySelector('p').innerHTML);
          console.log("hej");
          };*/

        img.src = profile.picture;
        img.classList.add("profile-pic");
        img.classList.add("column-child");

        div.appendChild(img);
        div.appendChild(p);
    }

    div.draggable = true;
    div.classList.add(gender == "male" ? "col1" : "col3");
    div.classList.add("column");

    if (profile != null)
        div.id = profile.name;

    box.appendChild(div);
}

function findProfile(name) {
    var profile = findProfileInList(males, name);

    return profile != null
        ? profile
        : findProfileInList(females, name);
}

function findProfileInList(list, name) {
    for (var i = 0; i < list.length; i++) {
        var profile = list[i];

        if (profile.name != name)
            continue;

        return profile;
    }

    return null;
}

function getProfileNameFromDiv(div) {
    if (div.childNodes == null)
        return null;

    for (var i = 0; i < div.childNodes.length; i++) {
        var element = div.childNodes[i];
        if (element == null || element.nodeName != "P")
            continue;

        return element.id;
    }

    return null;
}

function readMatches() {
    var box = document.getElementById("matchPanelGrid");
    var readMatches = [];

    var lastUser = null;

    var matchIndex = 0;
    for (var index = 0; index < box.childNodes.length; index++) {
        var element = box.childNodes[index];

        if (element.nodeName !== "DIV" || !element.classList.contains("column"))
            continue;

        var id = getProfileNameFromDiv(element);

        if (id == null)
            continue;

        if (lastUser == null)
            lastUser = id;
        else {
            readMatches.push({
                left: findProfile(lastUser),
                right: findProfile(id),
                tableNo: matchIndex + 1,
            });

            matchIndex++;
            lastUser = null;
        }
    }

    return readMatches;
}

function addMatch(match) {
    var a = match.A;
    var b = match.B;

    var box = document.getElementById("matchPanelGrid");

    var aGender = a !== null
        ? a.gender
        : b.gender == "male"
            ? "female"
            : "male";

    var bGender = b !== null
        ? b.gender
        : a.gender == "male"
            ? "female"
            : "male";

    addProfile(a, aGender);

    var div = document.createElement("div");
    div.classList.add("col2");

    var p = document.createElement("p");
    p.classList.add("heart");


    var divTableNo = document.createElement("div");
    divTableNo.classList.add("tableNo");
    var table = document.createTextNode(tableNo);
    tableNo++;

    //   var tooltip =  document.createTextNode("Bordsnummer");

    //   spanHover.appendChild(tooltip); 
    //   divTableNo.appendChild(table);
    //   divTableNo.appendChild(spanHover);

    //   div.appendChild(p);
    //   div.appendChild(divTableNo);
    //   box.appendChild(div);

    var spanHover = document.createElement("span");
    spanHover.classList.add("tableNoText");

    var tooltip = document.createTextNode("Bordsnummer");



    spanHover.appendChild(tooltip);

    divTableNo.appendChild(table);
    divTableNo.appendChild(spanHover);

    div.appendChild(p);
    div.appendChild(divTableNo);
    box.appendChild(div);

    addProfile(b, bGender);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var timerOn = false;
var endMeet = false;
async function timer() {
    if (isStartDisabled())
        return;

    //choosen time in seconds
    let time = (document.getElementById('time').value) * 60;
    let countDown = time;

    if (countDown > 0 && !timerOn) {
        timerOn = true;


        var currentMatches = readMatches();
        socket.emit('setMatches', currentMatches);
        socket.emit('startClock');

        while (countDown > 0) {
            let minutes = Math.floor(countDown / 60);
            let seconds = countDown % 60;

            // Display the result in the element with id="timer"
            document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

            // Give page time to print
            await sleep(1000);

            // Decrement difference 
            countDown--;
            if (endMeet) {
                countDown = 0;
                endMeet = false;
            }

            // If the count down is finished, write some text 
            if (countDown == 0) {
                document.getElementById("timer").innerHTML = "Mötet är över";
                await sleep(4000);
                document.getElementById("timer").innerHTML = "";
                document.getElementById("time").innerHTML = "Längd på event (min)";
                timerOn = false;
            }
        }
    } else if (timerOn) {
        document.getElementById("timer").innerHTML = "Vänligen vänta tills mötet är över";
        await sleep(40000);
    } else {
        document.getElementById("timer").innerHTML = "Vänligen ge ett giltigt värde (värde över 0)";
    }
    if (countDown == 0) {
        socket.emit('stopClock');
    }
}

function endMeeting() {
    endMeet = true;
}

if (!Modernizr.draganddrop)
    alert("Your browser does not support drag and drop!");

var draggedElement = null;
var draggedOverElement = null;
var previousTarget = null;
var unmatchedEnters = 0;

var columnClasses = ["col1", "col3", "unmatched-col"];

function getColumnClass(element) {
    var classList = element.classList;

    for (var i = 0; i < classList.length; i++) {
        var currentClass = classList[i];
        if (!columnClasses.includes(currentClass))
            continue;

        return currentClass;
    }

    return null;
}

function applyTargetEffect(element) {

    var effectTarget = element;
    effectTarget = getTargetContainer(effectTarget, false);

    if (effectTarget == null)
        return;

    if (effectTarget == document.getElementById("unmatchedGrid"))
        unmatchedEnters++;

    effectTarget.style.border = "2px dashed #000";
}

function removeTargetEffect(element) {

    var effectTarget = element;
    effectTarget = getTargetContainer(effectTarget, false);

    if (effectTarget == null)
        return;

    if (effectTarget == document.getElementById("unmatchedGrid")) {
        unmatchedEnters--;
        if (unmatchedEnters > 0)
            return;
    }

    effectTarget.style.border = "";
}

function handleDragStart(event) {
    var target = getTargetContainer(event.target, true);

    if (target == null)
        return;

    if (target.innerHTML == "")
        target = null;

    draggedElement = target;
}

function getTargetContainer(element, includeUnmatchedCards) {
    while (element != null) {
        if (element.parentNode == window.document || element.classList == null)
            return null;

        if (!includeUnmatchedCards) {
            if (element.id === "unmatchedGrid")
                return element;

            if (element.classList.contains("column") && !element.classList.contains("unmatched-col"))
                return element;
        } else if (element.classList.contains("column")) {
            return element;
        }

        element = element.parentNode;
    }

    return null;
}

function isStartDisabled() {
    return document.getElementById("startbutton").hasAttribute("disabled");
}

function disableStart() {
    var button = document.getElementById("startbutton");

    button.setAttribute("disabled", "disabled");
    button.style.opacity = 0.5;
}

function enableStart() {
    var button = document.getElementById("startbutton");

    button.removeAttribute("disabled");
    button.style.opacity = 1;
}

function handleDrop(event) {
    if (draggedElement == null)
        return;

    event.preventDefault();

    var target = getTargetContainer(event.target, false);
    if (target == draggedElement)
        return;

    var source = draggedElement;

    var overwrittenHtml = target.innerHTML;
    var sourceHtml = draggedElement.innerHTML;
    var overwrittenType = getColumnClass(target);
    var sourceType = getColumnClass(draggedElement);

    var unmatchedContainer = document.getElementById("unmatchedGrid");

    var newDivHtml = overwrittenHtml;
    if (overwrittenType != null)
        target.innerHTML = sourceHtml;
    else
        newDivHtml = source.innerHTML;

    if (sourceType === "unmatched-col") {
        unmatchedContainer.removeChild(source);

        if (unmatchedContainer.children.length == 0)
            enableStart();
    }
    else {
        source.innerHTML = "";
    }

    if (overwrittenHtml != "" || overwrittenType == null) {
        var newDiv = document.createElement("div");

        newDiv.classList.add("unmatched-col");
        newDiv.classList.add("column");
        newDiv.draggable = true;
        newDiv.innerHTML = newDivHtml;

        unmatchedContainer.appendChild(newDiv);

        if (unmatchedContainer.children.length != 0)
            disableStart();
    }

    removeTargetEffect(target);
    draggedElement = null;
}

function preventEvent(event) {
    event.preventDefault();
}

function handleDragEnter(event) {
    event.stopPropagation();
    if (draggedElement == null)
        return;

    var target = getTargetContainer(event.target, false);

    if (target == draggedElement)
        return;

    if (target == draggedElement)
        return;

    previousTarget = target;
    applyTargetEffect(target);
}

function handleDragLeave(event) {
    if (draggedElement == null)
        return;

    event.stopPropagation();
    var target = getTargetContainer(event.target, false);

    if (target == draggedElement)
        return;

    removeTargetEffect(target);
}

var columns = document.querySelectorAll("#matchPanelGrid .column");

for (var i = 0; i < columns.length; i++) {
    var column = columns[i];
}

document.addEventListener("dragstart", handleDragStart, false);
document.addEventListener("dragstop", preventEvent, false);
document.addEventListener("dragover", preventEvent, false);
document.addEventListener("drop", handleDrop, false);

document.addEventListener("dragenter", handleDragEnter, false);
document.addEventListener("dragleave", handleDragLeave, false);

/*Buttons och progressbar*/
var gameState = 0;

function findProfile(name) {
    let profiles = males.concat(females);
    for (var i = 0; i < profiles.length; i++) {
        if (profiles[i].name == name) {
            return profiles[i];
        }
    }
    return null;
}

function openPopup(div) {
    let popup = document.getElementById('popupBox');
    let profileContent = document.getElementById('profileContent');
    profileContent.innerHTML = "";
    popup.style.display = "block";

    let profile = findProfile(div.querySelector('p').innerHTML);
    let profileImg = document.createElement('img');
    profileImg.src = profile.picture;

    let namePara = document.createElement('p');
    let profilename = document.createTextNode(profile.name + ",");
    namePara.appendChild(profilename);

    let agePara = document.createElement('p');
    let profileAge = document.createTextNode(profile.age + " år, ");
    agePara.appendChild(profileAge);

    let fromPara = document.createElement('p');
    let profileFrom = document.createTextNode("Bor i " + profile.location);
    fromPara.appendChild(profileFrom);

    let bioPara = document.createElement('p');
    let profileBio = document.createTextNode("Beskrivning: \n" + profile.description);
    bioPara.appendChild(profileBio);

    profileContent.appendChild(profileImg);
    profileContent.appendChild(namePara);
    profileContent.appendChild(agePara);
    profileContent.appendChild(fromPara);
    profileContent.appendChild(bioPara);

}



function closePopup() {
    document.getElementById('popupBox').style.display = "none";
}
