const {
    Auctions
} = require("../resources/auctions");
const {
    Bid
} = require("../resources/bid")

class AuctionController {
    constructor() {
        this.auctions = new Auctions();
    }

    //get all auctions (ie: skateboards, computers, etc...)
    getAllAuctions() {
        return this.auctions.getAllAuctions();
    }

    //get an auction by name (input: auctionName)
    getAuctionsByName(name) {
        if (this.auctions.getAuction(name) === undefined) {
            throw "No auctions with " + name + " found";
        }
        return this.auctions.getAuction(name);
    }

    //to place a bid on an auction
    //did not account for same name bidders
    bidOnAuction(auctionName, bidBody) {
        if (this.auctions.getAuction(auctionName) === undefined) {
            throw "Auction " + auctionName + " is not availble for bidding";
        }
        if (bidBody.name === undefined || bidBody.starting_bid === undefined ||
            bidBody.max_bid === undefined || bidBody.increment === undefined) {
                throw "Invalid bid. Please try again."
        }

        //same bidder name case
        if(this.auctions.getAuction(auctionName).bidExists(bidBody.name)){
            throw "You already have a bid in the system."
        }

        const bid = new Bid(bidBody.name, bidBody.starting_bid, bidBody.max_bid, bidBody.increment);
        this.auctions.getAuction(auctionName).addBid(bid);
    }

    //return name and winning bid
    getAuctionWinner(name) {
        if (this.auctions.getAuction(name) === undefined) {
            throw "Auction " + name + " not found";
        }
        return this.auctions.getAuction(name).calculateWinner();
    }

    //create new auction
    createAuction(name) {
        if(name === undefined) {
            throw "Auction name required";
        }

        const auction = this.auctions.getAuction(name);
        if (auction != undefined) {
            if(auction.getAuctionName() == name){
                throw "Auction with " + name + " already exist";
            }   
        }

        this.auctions.newAuction(name);
    }
}

module.exports = {
    AuctionController
}