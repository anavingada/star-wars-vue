const urlsMixin = {
    data() {
        return {
            currentURL: ''
        };
    },
    methods: {
        // Function to check if URL has params
        checkUrlParams(routeFullpath) {
            this.currentURL = routeFullpath;
            if (this.currentURL.includes('?')) {
                if (this.$route.query.page == "") {
                    // param is empty
                    return false;
                } else {
                    // it has params
                    return true;
                }
            } else {
                // it doesn't have params
                return false;
            }
        },
        // Function to updateQuery after click to change page
        updateQuery(path, name, page) {
            this.$router.push({
                path: path,
                name: name,
                query: {
                    page: page,
                },
            });
        },
    },
};

export {
    urlsMixin
};