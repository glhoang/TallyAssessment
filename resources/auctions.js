const { Auction } = require('./auction')

class Auctions {
    constructor() {
        //dictionary object
        this.auctions = {}
    }

    //get back auction that user just posted
    newAuction(name) {
        this.auctions[name] = new Auction(name);
        return this.auctions[name];
    }

    //get auction for a specific person
    getAuction(name) {
        return this.auctions[name];
    }

    //get all auctions
    getAllAuctions() {
        return this.auctions;
    }
}

module.exports = {
    Auctions
}