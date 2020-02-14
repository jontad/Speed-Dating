 //document.getElementById('timer').value;

function timer() {
    console.log("hello")
    //console.log(time)

    var countDown = setInterval(function() {
	console.log("yo")
	var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
	var now = new Date().getTime();
	var diff = countDownDate - now;

	
	// Time calculations for days, hours, minutes and seconds
	var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((diff % (1000 * 60)) / 1000);

	// Display the result in the element with id="timer"
	document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

	// If the count down is finished, write some text 
	if (minutes < 1 && seconds == 0) {
	    clearInterval(countDown);
	    document.getElementById("timer").innerHTML = "Meeting is over";
	}
    }, 1000);
    

}




