const { StatusCodes } = require("http-status-codes");
const {AirportRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();
async function createAirport(data){

    try{
        const airport = await airportRepository.create(data);
        return airport;
    }
    catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAllAirports(query){
    filter = {}
    if(query.departureAirportId || query.arrivalAirportId || query.code){
        filter = {
            code: query.departureAirportId || query.arrivalAirportId || query.code
        }
    }
    try{
        const airports = await airportRepository.getAllAirports(filter);
        return airports;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Cannot fetch data of all airports", error.statusCode);
        }
        throw new AppError("Cannot fetch data of all the airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try{
        const response = await airportRepository.get(id);
        return response;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested is not found", error.statusCode);
        }
        throw new AppError("Cannot fetch data of the airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function destroyAirport(id){
    try{
        const response = await airportRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested is not found", error.statusCode);
        }
        throw new AppError("Cannot fetch data of the airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAllAirports,
    getAirport,
    destroyAirport,
}