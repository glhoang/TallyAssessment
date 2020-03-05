const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const auctionRouter = require("./routes/auctionsRoutes")

app.use(bodyParser.json())

//this is the base route to lead to the router
app.use('/auction', auctionRouter);

//Initialize app
app.listen(port, () => console.log(`App listening on port ${port}!`))