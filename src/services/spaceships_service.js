// GET list of movies
const getSpaceships = async function (currentPage) {
    try {
        var url = 'https://swapi.dev/api/starships/?page=' + currentPage;
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
const getSpaceshipInfo = async function (spaceshipUrl) {
    try {
        const response = await fetch(spaceshipUrl);
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

export const spaceshipsService = {
    getSpaceships,
    getSpaceshipInfo
};