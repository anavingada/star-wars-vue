const searchesMixin = {
    methods: {
        search(name) {
            var searchURL = 'http://www.google.com/search?q=star-wars-' + name;
            window.open(searchURL, '_blank');
        }
    },
};

export {
    searchesMixin
};