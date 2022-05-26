// GET list of movies
const getVehicles = async function (currentPage) {
    try {
        var url = 'https://swapi.dev/api/vehicles/?page=' + currentPage;
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
const getVehicleInfo = async function (vehicleUrl) {
    try {
        const response = await fetch(vehicleUrl);
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

export const vehiclesService = {
    getVehicles,
    getVehicleInfo
};