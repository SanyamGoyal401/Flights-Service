const {Sequelize, Op, where} = require('sequelize');
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport} = require("../models");
const db = require('../models');
const {addRowLockOnFlights} = require('./queries');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        console.log(filter);
        console.log(sort);
        try {
            const response = await Flight.findAll({
                where: filter,
                order: sort,
                include: [
                    {
                        model: Airplane, 
                        required : true,
                        as: "airplane_detail",
                    },
                    {
                        model:Airport,
                        required: true,
                        as: "departure_airport",
                        on:{
                            col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departure_airport.code"))
                        },                    
                    },
                    {
                        model:Airport,
                        required: true,
                        as: "arrival_airport",
                        on:{
                            col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrival_airport.code"))
                        },                    
                    }
                ]
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }


    async updateRemainingSeats(flightId, seats, dec = true){
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        try{
            if(dec){
                await flight.decrement('totalSeats', {by: seats});
            }
            else{
                await flight.increment('totalSeats', {by: seats});
            }
            return flight;
        }
        catch(error){
            console.log(error);
        }
        
    }
}

module.exports = FlightRepository;