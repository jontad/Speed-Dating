const vm = new Vue({
    el: '#vue',
    data: {
        profiles: profiles,
        matches: matches
    },
    methods: {
        getUserBoxClass: function (profile, index) {
            var horizontal = index % 2 == 1
                ? "userbox-right"
                : "userbox-left";

            return horizontal;
        }
    },
})