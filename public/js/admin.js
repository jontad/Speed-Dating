
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


async function timer() {
	//choosen time in seconds
	let time = (document.getElementById('time').value) * 60;
	let diff = time;

	if (diff > 0) {
		while (diff > 0) {
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
var previousTarget = null;
var unmatchedEnters = 0;

var columnClasses = ["col1", "col3", "unmatched-col"];

function getOppositeColumn(element) {
	return element.classList.contains("col1")
		? "col3"
		: "col1";
}

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

function isOpposite(a, b) {
	if (a == null || b == null)
		return false;

	var classA = getColumnClass(a);
	var classB = getColumnClass(b);

	return classA !== classB;
}

function applyTargetEffect(element) {
	
	var effectTarget = element;
	effectTarget = getTargetContainer(effectTarget, false);

	if (effectTarget == document.getElementById("unmatchedGrid"))
		unmatchedEnters++;

	effectTarget.style.border = "2px dashed #000";
}

function removeTargetEffect(element) {
	
	var effectTarget = element;
	effectTarget = getTargetContainer(effectTarget, false);

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

function handleDrop(event) {
	event.preventDefault();

	var target = getTargetContainer(event.target, false);
	if (!isOpposite(target, draggedElement))
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
		unmatchedContainer.removeChild(source);
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

	if (!isOpposite(target, draggedElement))
		return;

	previousTarget = target;
	applyTargetEffect(target);
}

function handleDragLeave(event) {
	event.stopPropagation();
	var target = getTargetContainer(event.target, false);

	if (!isOpposite(target, draggedElement))
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
