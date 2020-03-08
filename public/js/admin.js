var profiles = [];
var matches = [];

for (var i = 0; i < 10; i++)
{
	// name, age, description, location, picture, phoneNumber, email
	var url = "https://i.stack.imgur.com/34AD2.jpg";

	var a = new Profile(String.fromCharCode("a".charCodeAt(0) + i), 100, "Hejsan", "Okänd plats", url, "070111000111", "a@b.c", "male");
	var b = new Profile(String.fromCharCode("A".charCodeAt(0) + i), 100, "Hejsan", "Okänd plats", url, "070111000111", "a@b.c", "female");

	var match = new Match(a, b);

	matches.push(match);
	profiles.push(a);
	profiles.push(b);

	addMatch(a, b);
}

function addProfile(profile)
{
	var box = document.getElementById("matchPanelGrid");

	var div = document.createElement("div");
	var img = document.createElement("img");
	var p = document.createElement("p");

	p.innerText = profile.name;
	p.classList.add("column-child");

	img.src = profile.picture;
	img.classList.add("profile-pic");
	img.classList.add("column-child");

	div.draggable = true;
	div.classList.add("column");
	div.classList.add(profile.gender == "male" ? "col1" : "col3");
	div.appendChild(img);
	div.appendChild(p);

	box.appendChild(div);
}

function addMatch(a, b)
{
	var box = document.getElementById("matchPanelGrid");

	addProfile(a);

	var div = document.createElement("div");
	var p = document.createElement("p");

	p.classList.add("heart");
	div.classList.add("col2");

	div.appendChild(p);

	box.appendChild(div);

	addProfile(b);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let timerOn = false;
async function timer() {
	if (isStartDisabled())
		return;

    //choosen time in seconds
    let time = (document.getElementById('time').value) * 60;
    let countDown = time;

    if (countDown > 0 && !timerOn) {
	timerOn = true;
	
	while (countDown > 0) {
	    let minutes = Math.floor(countDown / 60);
	    let seconds = countDown % 60;

	    // Display the result in the element with id="timer"
	    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

	    // Give page time to print
	    await sleep(1000);

	    // Decrement difference 
	    countDown--;

	    // If the count down is finished, write some text 
	    if (countDown == 0) {
		document.getElementById("timer").innerHTML = "Mötet är över";
		await sleep(4000);
		document.getElementById("timer").innerHTML = "";
		document.getElementById("time").innerHTML = "Längd på event (min)";
		timerOn = false;
	    }
	}
    } else if(timerOn){
	document.getElementById("timer").innerHTML = "Vänligen vänta tills mötet är över";	
	await sleep(40000);
    } else {
	document.getElementById("timer").innerHTML = "Vänligen ge ett giltigt värde (värde över 0)";
    }
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

	if (effectTarget == document.getElementById("unmatchedGrid"))
	{
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

function isStartDisabled()
{
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

	if (sourceType === "unmatched-col")
	{
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
