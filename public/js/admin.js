
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

var columnClasses = ["col1", "col3", "unmatched-col"];

function getOppositeColumn(element) {
	return element.classList.contains("col1")
		? "col3"
		: "col1";
}

function getColumnClass(element) {
	var classList = element.classList;

	for (var i = 0; i < classList.length; i++)
	{
		var currentClass = classList[i];
		if (!columnClasses.includes(currentClass))
			continue;

		return currentClass;
	}

	return null;
}

function isOpposite(a, b) {
	if (a == null || b == null)
		return false;

	var classA = getColumnClass(a);
	var classB = getColumnClass(b);

	return classA !== classB;
}

function handleDragStart(event) {
	var target = getTargetContainer(event.target);

	if (target == null)
		return;

	draggedElement = target;
}

function getTargetContainer(element) {
	while (element != null)
	{
		if (element.parentNode == window.document || element.classList == null)
			return null;

		if (element.classList.contains("column"))
			return element;

		element = element.parentNode;
	}

	return null;
}

function handleDrop(event) {
	event.preventDefault();

	var target = getTargetContainer(event.target);
	if (!isOpposite(target, draggedElement))
		return;

	var source = draggedElement;

	var overwrittenHtml = target.innerHTML;
	var sourceHtml = draggedElement.innerHTML;
	var overwrittenType = getColumnClass(target);
	var sourceType = getColumnClass(draggedElement);

	var unmatchedContainer = document.getElementById("unmatchedGrid");

	if (sourceType === "unmatched-col")
		unmatchedContainer.removeChild(source);
	else {
		source.innerHTML = "";
	}

	if (overwrittenType !== "unmatched-col") {
		target.innerHTML = sourceHtml;

		var newDiv = document.createElement("div");

		if (overwrittenHtml !== "")
		{
			newDiv.classList.add("unmatched-col");
			newDiv.classList.add("column");
			newDiv.draggable = true;
			newDiv.innerHTML = overwrittenHtml;
		}
	
		unmatchedContainer.appendChild(newDiv);
	}

	target.style.opacity = 1;

	// target.parentNode.replaceChild(draggedElement, target);
	draggedElement = null;
}

function preventEvent(event) {
	event.preventDefault();
}

function handleDragEnter(event) {
	if (draggedElement == null)
		return;

	var target = getTargetContainer(event.target);

	if (target == draggedElement)
		return;

	event.stopPropagation();
	if (!isOpposite(target, draggedElement))
		return;

	target.style.opacity = 0.4;
}

function handleDragLeave(event) {
	var target = getTargetContainer(event.target);

	event.stopPropagation();
	if (!isOpposite(target, draggedElement))
		return;

	target.style.opacity = 1;
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

document.addEventListener("dragenter", handleDragEnter, false);
document.addEventListener("dragleave", handleDragLeave, false);
