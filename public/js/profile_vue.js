const vm = new Vue({
    el: 'main',
    data: {
        profile: dummy,
        questions: dummyQuestions,
    },
    methods: {
        range: function(end) {
            return Array(end).fill().map((_, idx) => 1 + idx)
        }
    }
});
