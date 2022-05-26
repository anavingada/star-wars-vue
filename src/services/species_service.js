// GET list of movies
const getSpecies = async function (currentPage) {
    try {
        var url = 'https://swapi.dev/api/species/?page=' + currentPage;
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
const getSpecieInfo = async function (specieUrl) {
    try {
        const response = await fetch(specieUrl);
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

export const speciesService = {
    getSpecies,
    getSpecieInfo
};