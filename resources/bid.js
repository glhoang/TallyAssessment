class Bid {
    constructor(name, starting_bid, max_bid, increment) {
        this.name = name;
        this.starting_bid = starting_bid;
        this.max_bid = max_bid;
        this.increment = increment;
    }
}

module.exports = {
    Bid
}