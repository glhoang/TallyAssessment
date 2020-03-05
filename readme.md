### Tally Coding Assessment

To run this program, please follow the following steps:

    npm i
    npm start
 
To add an auction named skateboard


    curl --location --request POST 'localhost:3000/auction' \
    --header 'Content-Type: application/json' \
    --data-raw '{"name" : "skateboard"}'

To add first bidder to auction skateboard

    curl --location --request POST 'localhost:3000/auction/skateboard' \
    --header 'Content-Type: application/json' \
    --data-raw '{
                "name": "Mason",
                "starting_bid": 625,
                "max_bid": 725,
                "increment": 8
                }'

To add second bidder to auction skateboard

    curl --location --request POST 'localhost:3000/auction/skateboard' \
    --header 'Content-Type: application/json' \
    --data-raw '{
                "name": "Olivia",
                "starting_bid": 599,
                "max_bid": 725,
                "increment": 15
            }'

To add third bidder to auction skateboard 

    curl --location --request POST 'localhost:3000/auction/skateboard' \
    --header 'Content-Type: application/json' \
    --data-raw '{
                    "name": "Alicia",
                    "starting_bid": 700,
                    "max_bid": 725,
                    "increment": 2
                }'

To get an auction by name

    curl --location --request GET 'localhost:3000/auction/skateboard' \
    --header 'Content-Type: application/json' \
    --data-raw '{"name" : "skateboard" }'

To get winner of auction skateboard

    curl --location --request GET 'localhost:3000/auction/skateboard/winner'


To run all tests

    npm t