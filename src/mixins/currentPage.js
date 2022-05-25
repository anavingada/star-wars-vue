const currentPageMixin = {
    data() {
        return {
            currentURL: '',
            currentPage: null
        };
    },
    methods: {
        fetchCurrentPage(windowLocation) {
            this.currentURL = windowLocation;
            let paramsURL = new URLSearchParams(this.currentURL);
            this.currentPage = paramsURL.get('page');
            this.currentPage = this.$route.query.page;
            console.log('currentPage: ' + this.currentPage);
            return this.currentPage;
        }
    },
};
export default currentPageMixin;