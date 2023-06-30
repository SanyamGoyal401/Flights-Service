const { StatusCodes } = require("http-status-codes");
const {FlightRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const {Op} = require('sequelize');


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


async function getAllFlights(query){
    //tirps = MUM-DEL
    let customFilter = {};
    let sortFilter = [];
    if(query.trips){
        let [departureAirportId, arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price){
        let [low, high] = query.price.split('-');
        customFilter.price = {[Op.between]:[low, (high == undefined) ? 20000: high]}
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime = {
           [Op.between] : [query.tripDate, query.tripDate+" 23:59:00"]
        }
    }
    if(query.sort){
        const params = query.sort.split(',')
        const sortFilters = params.map((param)=>param.split('_'));
        sortFilter = sortFilters
    }

    try{
        const flights = flightRepository.getAllFlights(customFilter ,sortFilter)
        return flights;
    }
    catch(error){
        throw new AppError('Cannot fetch data of all Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }


}

module.exports = {
    createFlight,
    getAllFlights,
}