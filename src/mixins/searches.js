const searchesMixin = {
    methods: {
        searchMovie(movieName) {
            var searchURL = 'http://www.google.com/search?q=star-wars-' + movieName;
            window.open(searchURL, '_blank');
        }
    },
};

export {
    searchesMixin
};

