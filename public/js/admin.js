
function changeToUnmatch() {
	'use strict';
	let unmatch = document.getElementById('unmatchPanel');
	let unmatchButton = document.getElementById('unmatchButton');
	let match = document.getElementById('matchPanel');
	let matchButton = document.getElementById('matchButton');
	
	unmatch.style.display='block';
	unmatchButton.style.borderBottom='none';
	matchButton.style.borderBottom='solid 2px black';
	match.style.display='none';
	match.style.borderBottom='display';
	matchButton.style.backgroundColor='whitesmoke';
	unmatchButton.style.backgroundColor='white';
};

function changeToMatch() {
	'use strict';
	let unmatch = document.getElementById('unmatchPanel');
	let unmatchButton = document.getElementById('unmatchButton');
	let match = document.getElementById('matchPanel');
	let matchButton = document.getElementById('matchButton');
	
	match.style.display='block';
	matchButton.style.borderBottom='none';
	unmatchButton.style.borderBottom='solid 2px black';
	unmatch.style.display='none';
	unmatch.style.borderBottom='display';
	unmatchButton.style.backgroundColor='whitesmoke';
	matchButton.style.backgroundColor='white';
};

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

	    // Give page time to print
	    await sleep(1000);
	    
	    // Display the result in the element with id="timer"
	    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

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








