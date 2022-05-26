// GET list of movies
const getPlanets = async function (currentPage) {
    try {
        var url = 'https://swapi.dev/api/planets/?page=' + currentPage;
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
const getPlanetInfo = async function (planetUrl) {
    try {
        const response = await fetch(planetUrl);
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

export const planetsService = {
    getPlanets,
    getPlanetInfo
};