
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







