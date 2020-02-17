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
