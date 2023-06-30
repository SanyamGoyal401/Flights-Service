
const CrudRepository = require("./crud-repository");
const { Flight } = require("../models");

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
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = FlightRepository;