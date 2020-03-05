const express = require("express")
const router = express.Router()
const { AuctionController } = require("../controllers/auctionController")
const { Bid } = require("../resources/bid")

//this is our in memory persistent data
const auctionController = new AuctionController();

//get all auctions in system
router.get('/', (req, res) => {
    res.send(auctionController.getAllAuctions());
})

//get auction by name
router.get('/:name', (req, res) => {
    const name = req.params.name;
    res.send(auctionController.getAuctionsByName(name));
})

//creating an auction (ie: skateboard, etc..)
router.post('/', (req, res) => {
    const body = req.body;
    auctionController.createAuction(body.name);
    res.status(201).send();
})

//creating bids for an auction
router.post('/:name', (req, res) => {
    const auctionName = req.params.name;
    auctionController.bidOnAuction(auctionName, req.body);
    res.status(201).send();
})

//gettin auction winner
router.get('/:name/winner', (req, res) => {
    const auctionName = req.params.name;
    res.send(auctionController.getAuctionWinner(auctionName));
})

module.exports = router