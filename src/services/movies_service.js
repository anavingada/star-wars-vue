// GET list of movies
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

// Get info of a movie based on the ID
const getMovieInfo = async function (movieUrl) {
    try {
        const response = await fetch(movieUrl);
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
    getMovies,
    getMovieInfo
};