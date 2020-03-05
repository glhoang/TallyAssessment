
### Interview Coding Exercise
# Auction

## Overview
This exercise serves as a mechanism for allowing an engineering candidate to demonstrate their familiarity with Scala or JVM based languages, common design patterns, coding style and problem solving skills while in a comfortable environment. Your solution will be used to facilitate a conversation during technical interviews.

## Rules of Engagement
There are a few guidelines to follow while completing this exercise:

* __Keep It Confidential:__ Please keep this document, the problem, and your solution confidential between yourself and Tally, even after leaving the interview
* __48-hour Time Limit:__ This should be a relatively short but fun exercise to show of your knowledge about specific technologies and software engineering principles.  Unless otherwise arranged, make handoff to Tally within 48 hours,
* __Use Generally Available Tools:__ Tally's Engineering team evaluates new releases of tools and technologies as they become available, however for this exercise, please only use the latest version of tools and technologies that are considered Generally Available,
* __Open Documentation, Open Internet:__ Engineers spend a non-trivial amount of time sourcing information online; feel free to use online resources and be able to demonstrate why you selected one approach to solving a problem over another,
* __Deliver a Complete Project:__ Archive (zip or tar) of the entire project, including source code, test cases, dependencies, and any supporting documentation required to build the project -- We want to be able to run your solution on our machines.


## Technical Requirements

All software projects require careful balance of both technical requirements along with functional requirements.  Your solution shall comply with the following technical objectives:

* Implement your solution in the language you're most comfortable with (we use mainly Scala)
* Make sure you include unit tests in your solution
* The solution must be an API (think code with a well defined contract, not web-services); no graphical user interface of any kind is required for the exercise 
* Provide a README file explaining your thought process, API design and overall approach taken
* There is no need to provide any form of data persistence

We are looking for a **clean**, **well-factored**, object-oriented or functional-oriented codebase that has accompanying unit tests.

## Functional Requirements

Your company has tasked you with creating an auto-bid auction system, giving bidders the ability to pre-authorize bids up to a maximum even when they aren't connected to the platform.

Your objective is to create an API and algorithm for determining the winning bid after all bidders have entered their bid directions into the system.  Your API will be integrated into the auction house's website by other developers working on the project, so it is imperative that your API be clean and self documenting with additional inline comments where it improves readability.

The site will allow each bidder to enter three parameters:

1.  __Starting bid__: The first and lowest bid the buyer is willing to offer for the item.

1.  __Max bid__: This maximum amount the bidder is willing to pay for the item.

1.  __Auto-increment amount__: A dollar amount that the computer algorithm will add to the bidder's current bid each time the bidder is in a losing position relative to the other bidders. The algorithm should never let the current bid exceed the Max bid. The algorithm should only allow increments of the exact auto-increment amount.

For each auction, your algorithm should determine: __Who is the winning bidder?__ and __What is the amount of the winning bid?__

The following table includes test data you should use to test your solution.  Bidders are listed in the order they entered their information on the site. Should there be a tie between two or more bidders, the first person that entered their information wins. The amount of the winner's bid should be the lowest amount possible while observing all the previous rules.

| Bidder           | Auction One: Skates | Auction Two: Unicycle | Auction Three: Hover Board |
|------------------|---------------------:|---------------------:|--------------------:|
| __Alicia__        |                      |                      |                     |
| Starting Bid     | $50.00               | $700.00              | $2,500              |
| Max Bid          | $80.00               | $725.00              | $3,000              |
| Increment amount | $3.00                | $2.00                | $500                |
| __Olivia__        |                      |                      |                     |
| Starting Bid     | $60.00               | $599.00              | $2,800              |
| Max Bid          | $82.00               | $725.00              | $3,100              |
| Increment amount | $2.00                | $15.00               | $201                |
| __Mason__       |                      |                      |                     |
| Starting Bid     | $55.00               | $625.00              | $2,501              |
| Max Bid          | $85.00               | $725.00              | $3,200              |
| Increment amount | $5.00                | $8.00                | $247                |