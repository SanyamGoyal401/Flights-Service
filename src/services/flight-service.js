const { StatusCodes } = require("http-status-codes");
const {FlightRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();
async function createFlight(data){

    try{
        const flight = await flightRepository.create(data);
        return flight;
    }
    catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getFlights(){
    try{
        const flights = await flightRepository.getAll();
        return flights;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Cannot fetch data of all flights", error.statusCode);
        }
        throw new AppError("Cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try{
        const response = await flightRepository.get(id);
        return response;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The flight you requested is not found", error.statusCode);
        }
        throw new AppError("Cannot fetch data of the flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function destroyFlight(id){
    try{
        const response = await flightRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The flight you requested is not found", error.statusCode);
        }
        throw new AppError("Cannot fetch data of the flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getFlights,
    getFlight,
    destroyFlight,
}