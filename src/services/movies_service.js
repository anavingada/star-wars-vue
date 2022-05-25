const getMovies = async function (currentPage) {
    try {
        var url = 'https://swapi.dev/api/films?page=' + currentPage;
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            return response.status;
        }
    } catch (error) {
        console.log(error);
        return;
    }
};


export const moviesService = {
    getMovies
};