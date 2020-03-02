
let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt rhoncus ante sollicitudin scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis eu viverra felis. Suspendisse gravida ipsum nec arcu rutrum, quis iaculis velit dignissim. Vivamus non sapien ac lacus pretium elementum. Cras aliquet";


const vm = new Vue({
    el: 'main',
    data: {
		info: loremIpsum,
		eventState: 0,
    },
	methods: {
		changeState: function (){
			let time = (document.getElementById('time').value) * 60;
			if(time > 0 && this.eventState < 4) {
				this.eventState += 1;
			}
		}	
	},
});

  
