const {
    AuctionController
} = require('../controllers/auctionController')
const {
    Bid
} = require('../resources/bid')

const AUCTION_NAME = "skateboard";

describe('Creating an auction', () => {
    let auctionController;
    beforeEach(() => {
        auctionController = new AuctionController();
        auctionController.createAuction(AUCTION_NAME);
    });

    it('should create an auction with name skateboard', () => {
        const data = auctionController.getAllAuctions();
        expect(data).toEqual({
            [AUCTION_NAME]: {
                "bids": [],
                "name": AUCTION_NAME
            }
        });
    });

    it('should not create an auction with the same name', () => {
        expect(() => {
            auctionController.createAuction(AUCTION_NAME);
        }).toThrow();
    });

    it('should not create an auction with no auction name', () => {
        expect(() => {
            auctionController.createAuction();
        }).toThrow();
    });

    it('should create multiple auctions', () => {
        auctionController.createAuction("computer");
        const data = auctionController.getAllAuctions();
        console.log(data);
        expect(Object.keys(data).length).toBeGreaterThanOrEqual(2);
    });

    it('should get an auction given a name', () => {
        const data = auctionController.getAuctionsByName(AUCTION_NAME);
        expect(data).toEqual({
            "bids": [],
            "name": AUCTION_NAME
        });
    });
});

describe('Creating a bid', () => {
    let auctionController;
    beforeEach(() => {
        auctionController = new AuctionController();
        auctionController.createAuction(AUCTION_NAME);
    });

    it('should create an bid to an auction', () => {
        auctionController.bidOnAuction(AUCTION_NAME, {
            "name": "Mason",
            "starting_bid": 625,
            "max_bid": 725,
            "increment": 8
        });
        const data = auctionController.getAllAuctions();
        expect(data).toEqual({
            [AUCTION_NAME]: {
                "bids": [{
                    "increment": 8,
                    "max_bid": 725,
                    "name": "Mason",
                    "starting_bid": 625
                }],
                "name": AUCTION_NAME
            }
        });
    });

    it('should not allow the same bid names', () => {
        auctionController.bidOnAuction(AUCTION_NAME, {
            "name": "Mason",
            "starting_bid": 625,
            "max_bid": 725,
            "increment": 8
        });
        expect(() => {
            auctionController.bidOnAuction(AUCTION_NAME, {
                "name": "Mason",
                "starting_bid": 625,
                "max_bid": 725,
                "increment": 8
            });
        }).toThrow();
    });

    it('should add multiple bidders', () => {
        auctionController.bidOnAuction(AUCTION_NAME, {
            "name": "Alice",
            "starting_bid": 700,
            "max_bid": 725,
            "increment": 2
        });
        auctionController.bidOnAuction(AUCTION_NAME, {
            "name": "Olivia",
            "starting_bid": 599,
            "max_bid": 725,
            "increment": 15
        });
        auctionController.bidOnAuction(AUCTION_NAME, {
            "name": "Mason",
            "starting_bid": 625,
            "max_bid": 725,
            "increment": 8
        });
        const data = auctionController.getAllAuctions();
        expect(data).toEqual({
            "skateboard": {
                "bids": [{
                    "increment": 2,
                    "max_bid": 725,
                    "name": "Alice",
                    "starting_bid": 700
                }, {
                    "increment": 15,
                    "max_bid": 725,
                    "name": "Olivia",
                    "starting_bid": 599
                }, {
                    "increment": 8,
                    "max_bid": 725,
                    "name": "Mason",
                    "starting_bid": 625
                }],
                "name": "skateboard"
            }
        });
    });

    describe('Calculation', () => {
        let auctionController;
        beforeEach(() => {
            auctionController = new AuctionController();
            auctionController.createAuction(AUCTION_NAME);
        });

        it('should calculate the winning bid amount and give us the bidder name', () => {
            auctionController.bidOnAuction(AUCTION_NAME, {
                "name": "Alice",
                "starting_bid": 700,
                "max_bid": 725,
                "increment": 2
            });
            auctionController.bidOnAuction(AUCTION_NAME, {
                "name": "Olivia",
                "starting_bid": 599,
                "max_bid": 725,
                "increment": 15
            });
            auctionController.bidOnAuction(AUCTION_NAME, {
                "name": "Mason",
                "starting_bid": 625,
                "max_bid": 725,
                "increment": 8
            });
            const data = auctionController.getAuctionWinner(AUCTION_NAME);
            expect(data).toEqual({"name": "Alice", "winning_bid": 722});
        });

        it('should pull the 1st if multiple winners and set up max_bid limiters', () => {
            auctionController.bidOnAuction(AUCTION_NAME, {
                "name": "Alice",
                "starting_bid": 50,
                "max_bid": 60,
                "increment": 2
            });
            auctionController.bidOnAuction(AUCTION_NAME, {
                "name": "Olivia",
                "starting_bid": 50,
                "max_bid": 73,
                "increment": 5
            });
            auctionController.bidOnAuction(AUCTION_NAME, {
                "name": "Mason",
                "starting_bid": 50,
                "max_bid": 71,
                "increment": 2
            });
            const data = auctionController.getAuctionWinner(AUCTION_NAME);
            expect(data).toEqual({"name": "Olivia", "winning_bid": 70});
        });

        it('should fail on no bids', () => {
            expect(() => {
                auctionController.getAuctionWinner(AUCTION_NAME);
            }).toThrow();
        });
    });

});