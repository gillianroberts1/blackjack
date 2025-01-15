const readline = require("readline");
const Deck = require("./Deck");
const Player = require("./Player");
const Dealer = require("./Dealer");

class Game {
  constructor() {
    // Initialises the game with a shuffled deck, player and dealer
    this.initialiseGame();
  }

  // Resets player and dealer hands and shuffles the deck
  initialiseGame() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck.shuffle();
  }

  async start() {
    // Starts game, dealing opening hands to player and dealer
    console.clear();
    console.log("Welcome to Blackjack!");
    this.dealOpeningHands();

    // Displays dealers hand showing first card and hiding second
    console.log("\nDealer's Hand:");
    console.log(
      `  ${this.dealer.hand.cards[0].rank} of ${this.dealer.hand.cards[0].suit}`
    );
    console.log("  [Face Down Card]");

    // Display players full hand
    console.log("\nYour Hand:");
    this.displayHand(this.player);

    // Player's Turn
    await this.playerTurn();

    // Dealer's Turn if player is not bust)
    if (this.player.hasValidHand()) {
      this.dealerTurn();
    }

    // Determine winner and show results
    this.determineWinner();
  }

  dealOpeningHands() {
    // Deals 2 cards each to the player and dealer
    this.player.dealOpeningHand(this.deck);
    this.dealer.dealOpeningHand(this.deck);
  }

  displayHand(playerOrDealer) {
    // Displays the cards and total score of the player or dealer
    playerOrDealer.hand.cards.forEach((card) => {
      console.log(`  ${card.rank} of ${card.suit}`);
    });
    console.log(`Total: ${playerOrDealer.getScore()}`);
  }

  async playerTurn() {
    // Manages the players turn and prompts for hit or stand updating hand accordingly
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Helper function to prompt player for action
    const promptPlayer = () =>
      new Promise((resolve) => {
        rl.question("\nDo you want to (h)it or (s)tand? ", (answer) => {
          resolve(answer.toLowerCase());
        });
      });

    let action;
    do {
      action = await promptPlayer(); // get player action
      if (action === "h") {
        //Player chooses to hit
        this.player.hit(this.deck);
        console.log("\nYour Hand:");
        this.displayHand(this.player);

        // Check if player is bust
        if (!this.player.hasValidHand()) {
          console.log("\nYou busted!");
          break;
        }
      }
    } while (action !== "s"); // continue until player stands

    rl.close();
  }

  dealerTurn() {
    // Manages the dealers turn by hitting until the score is 17 or more
    console.log("\nDealer's Turn:");
    this.displayHand(this.dealer);

    while (this.dealer.getScore() < 17) {
      console.log("Dealer hits...");
      this.dealer.hit(this.deck);
      this.displayHand(this.dealer);
    }

    // Determine if dealer can stand or is bust
    if (this.dealer.hasValidHand()) {
      console.log("Dealer stands.");
    } else {
      console.log("Dealer busted!");
    }
  }

  determineWinner() {
    // Determines the winner based on the final scores of the player and dealer
    const playerScore = this.player.getScore();
    const dealerScore = this.dealer.getScore();

    console.log("\nFinal Results:");
    console.log("Dealer's Hand:");
    this.displayHand(this.dealer);
    console.log("\nYour Hand:");
    this.displayHand(this.player);

    // Compare scores to determine the winner
    if (!this.player.hasValidHand()) {
      console.log("\nYou busted! Dealer wins.");
    } else if (!this.dealer.hasValidHand()) {
      console.log("\nDealer busted! You win.");
    } else if (playerScore > dealerScore) {
      console.log("\nYou win!");
    } else if (playerScore < dealerScore) {
      console.log("\nDealer wins.");
    } else {
      console.log("\nIt's a tie! Dealer wins.");
    }

    // Allow for another game
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("\nDo you want to play again? (y/n) ", (answer) => {
      if (answer.toLowerCase() === "y") {
        this.initialiseGame(); // reset game before starting again
        this.start(); // Start a new game
      } else {
        console.log("Thanks for playing Blackjack!");
        rl.close();
      }
    });
  }
}

module.exports = Game;
