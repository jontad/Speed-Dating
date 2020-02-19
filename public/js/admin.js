
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function timer() {
    //choosen time in seconds
    let time = (document.getElementById('time').value) * 60;
    let diff = time;

    if(diff > 0){
	while(diff > 0){
	    let minutes = Math.floor(diff / 60);
	    let seconds = diff % 60;
	    
	    // Display the result in the element with id="timer"
	    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
	    
	    // Give page time to print
	    await sleep(1000);

	    // Decrement difference 
	    diff--;

	    // If the count down is finished, write some text 
	    if (diff == 0) {
		document.getElementById("timer").innerHTML = "Mötet är över";
		await sleep(4000);
		document.getElementById("timer").innerHTML = "";
		document.getElementById("time").innerHTML = "Längd på event";
	    }
	}
    } else {
	document.getElementById("timer").innerHTML = "Vänligen ge ett giltigt värde (värde över 0)";
    }
}

if (!Modernizr.draganddrop)
	alert("Your browser does not support drag and drop!");

var draggedElement = null;
var draggedOverElement = null;

function getOppositeColumn(element) {
	return element.classList.contains("col1")
		? "col3"
		: "col1";
}

function handleDragStart(event) {
	draggedElement = event.target;
}

function handleDrop(event) {
	event.preventDefault();

	var target = event.target;
	if (!target.classList.contains(getOppositeColumn(draggedElement)))
		return;

	target.innerHTML = draggedElement.innerHTML;
	draggedElement.innerHTML = "";

	// target.parentNode.replaceChild(draggedElement, target);
	draggedElement = null;
}

function preventEvent(event) {
	event.preventDefault();
}

function handleDragEnter(event) {
	if (draggedElement == null)
		return;

	var target = event.target;

	if (!target.classList.contains(getOppositeColumn(draggedElement)))
		return;

	draggedOverElement = target;
}

function handleDragLeave(event) {
	var target = event.target;

	if (!target.classList.contains(getOppositeColumn(draggedElement)))
		return;

	draggedOverElement = null;
}

var columns = document.querySelectorAll("#matchPanelGrid .column");

for (var i = 0; i < columns.length; i++)
{
	var column = columns[i];
}

document.addEventListener("dragstart", handleDragStart, false);
document.addEventListener("dragstop", preventEvent, false);
document.addEventListener("dragover", preventEvent, false);
document.addEventListener("drop", handleDrop, false);

//document.addEventListener("dragenter", handleDragEnter, false);
//document.addEventListener("dragleave", handleDragLeave, false);
