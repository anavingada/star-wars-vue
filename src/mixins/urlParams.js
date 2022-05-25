const urlParamsMixin = {
    data() {
        return {
            currentURL: ''
        };
    },
    methods: {
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
        }
    },
};
export default urlParamsMixin;