const readline = require("readline");
const Deck = require("./Deck");
const Player = require("./Player");
const Dealer = require("./Dealer");

class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck.shuffle();
  }

  async start() {
    console.clear();
    console.log("Welcome to Blackjack!");
    this.dealOpeningHands();

    console.log("\nDealer's Hand:");
    console.log(
      `  ${this.dealer.hand.cards[0].rank} of ${this.dealer.hand.cards[0].suit}`
    );
    console.log("  [Hidden Card]");

    console.log("\nYour Hand:");
    this.displayHand(this.player);

    // Player's Turn
    await this.playerTurn();

    // Dealer's Turn (if player hasn't busted)
    if (this.player.hasValidHand()) {
      this.dealerTurn();
    }

    // Show Results
    this.determineWinner();
  }

  dealOpeningHands() {
    this.player.dealOpeningHand(this.deck);
    this.dealer.dealOpeningHand(this.deck);
  }

  displayHand(playerOrDealer) {
    playerOrDealer.hand.cards.forEach((card) => {
      console.log(`  ${card.rank} of ${card.suit}`);
    });
    console.log(`Total: ${playerOrDealer.getScore()}`);
  }

  async playerTurn() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const promptPlayer = () =>
      new Promise((resolve) => {
        rl.question("\nDo you want to (h)it or (s)tand? ", (answer) => {
          resolve(answer.toLowerCase());
        });
      });

    let action;
    do {
      action = await promptPlayer();
      if (action === "h") {
        this.player.hit(this.deck);
        console.log("\nYour Hand:");
        this.displayHand(this.player);

        if (!this.player.hasValidHand()) {
          console.log("\nYou busted!");
          break;
        }
      }
    } while (action !== "s");

    rl.close();
  }

  dealerTurn() {
    console.log("\nDealer's Turn:");
    this.displayHand(this.dealer);

    while (this.dealer.getScore() < 17) {
      console.log("Dealer hits...");
      this.dealer.hit(this.deck);
      this.displayHand(this.dealer);
    }

    if (this.dealer.hasValidHand()) {
      console.log("Dealer stands.");
    } else {
      console.log("Dealer busted!");
    }
  }

  determineWinner() {
    const playerScore = this.player.getScore();
    const dealerScore = this.dealer.getScore();

    console.log("\nFinal Results:");
    console.log("Dealer's Hand:");
    this.displayHand(this.dealer);
    console.log("\nYour Hand:");
    this.displayHand(this.player);

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
  }
}

module.exports = Game;
