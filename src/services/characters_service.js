// GET list of movies
const getCharacters = async function (currentPage) {
    try {
        var url = 'https://swapi.dev/api/people/?page=' + currentPage;
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
const getCharacterInfo = async function (characterUrl) {
    try {
        const response = await fetch(characterUrl);
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

export const charactersService = {
    getCharacters,
    getCharacterInfo
};