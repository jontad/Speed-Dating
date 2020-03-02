
let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt rhoncus ante sollicitudin scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis eu viverra felis. Suspendisse gravida ipsum nec arcu rutrum, quis iaculis velit dignissim. Vivamus non sapien ac lacus pretium elementum. Cras aliquet";


const vm = new Vue({
    el: 'main',
    data: {
	      info: loremIpsum,
        tables: 10,
    },
    methods: {
        range: function(end) {
            return Array(end).fill().map((_, idx) => 1 + idx)
        },
    }
});

  
