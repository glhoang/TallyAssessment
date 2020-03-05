const {
    Bid
} = require("./bid");

class Auction {
    //use dictionary to get key/values
    constructor(name) {
        this.name = name;
        this.bids = [];
    }

    //function to add bids
    addBid(bid) {
        this.bids.push(bid);
    }

    //getting all bids for the auction
    getBids() {
        return this.bids;
    }

    //get bid by bidder name
    getBidByName(name) {
        const bid = this.bids.filter((bid) => bid.name == name);
        if (bid.length === 0) {
            throw "No bids found"
        }
        return bid[0];
    }

    bidExists(name) {
        const bid = this.bids.filter((bid) => bid.name == name);
        return bid.length > 0;
    }

    getAuctionName() {
        return this.name;
    }


        // let bids = [
            // {
            //     name: "Alicia",
            //     starting_bid: 700,
            //     max_bid: 725,
            //     increment: 2
            // },
            // {
            //     name: "Olivia",
            //     starting_bid: 599,
            //     max_bid: 725,
            //     increment: 15
            // },
            // {
            //     name: "Mason",
            //     starting_bid: 625,
            //     max_bid: 725,
            //     increment: 8
            // },
        // ]

    // General strategy
    // Keep incrementing anyone who's not currently winning until they're the current winner
    // If they hit their max and are below the current winner, remove them from the bidder pool
    // Keep iterating until only 1 winner is left
    // If more than 1 winner, use the 1st person
    calculateWinner() {
        // init maxed and cut_off just for comfort
        this.bids.forEach((bid) => {
            bid.maxed = false;
            bid.cut_off = false;
        });

        // No bids at all, throw an error.
        if (this.bids.length === 0) {
            throw "No bids found.";
        }

        while (
            // While theres still bidders, keep incrementing non-current-winner bids.
            this.bids.length > 1
            // Also stop for edge case where all bids are maxed out
            && this.bids.filter((bid) => bid.maxed !== true).length !== 0
        ) {

            // Create a copy sorted list to get the current winner. Slice copy is needed because JS sort is inplace
            const sortedBids = this.bids.slice()
            sortedBids.sort((a, b) => {
                return b.starting_bid - a.starting_bid
            });

            // Iterate over all bidders in original list, increment non-winners
            for (const bid of this.bids) {
                if (
                    // Skip current winner
                    bid.name === sortedBids[0].name
                    // except in the edgecase where someone is maxed out
                    &&
                    this.bids.filter((bid) => bid.maxed === true).length === 0
                ) {
                    continue;
                }
                // If current bid for bidder not winning, try to increment
                if (bid.starting_bid <= sortedBids[0].starting_bid) {
                    // Increment if they have not hit max
                    if (bid.starting_bid + bid.increment <= bid.max_bid) {
                        bid.starting_bid += bid.increment;
                    } else {
                        // Else bidder is maxed out
                        if (bid.starting_bid < sortedBids[0].starting_bid) {
                            // Maxed out bidders who are not equal to winner get dropped from bidder pool
                            bid.cut_off = true;
                        } else {
                            // Maxed out bidders who equal winner are set to "max"
                            // The next iteration will check if everyone is maxed or drop this person if someone can go higher
                            bid.maxed = true;
                        }
                    }
                }
            }
            // Next round, only include bids that are not maxed
            this.bids = this.bids.filter((bid) => {
                return bid.cut_off !== true
            });
        }

        // Return the winner and current bid. Following
        return {
            name: this.bids[0].name,
            winning_bid: this.bids[0].starting_bid
        };
    }
}

module.exports = {
    Auction
}