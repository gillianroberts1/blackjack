const Hand = require("./Hand");
const Player = require("./Player");

class Dealer extends Player {
  constructor() {
    super("Dealer"); // call the parent constructor with Dealer as the name
    this.hand = new Hand();
  }

  // if score is 17 or more dealer must stand
  // if 16 or less then dealer must hit

  dealerMove(deck) {
    const score = this.getScore(); // get the dealers score ensuring aces are dealt with correctly

    //   Ensure that the dealer does not act if their hand is already "busted" (exceeds 21 points).
    if (this.isBust()) {
      console.log(
        `Dealer is busted with a score of ${score} and cannot take any more actions.`
      );
      return;
    }

    if (score >= 17) {
      this.stand(); // dealer stands on 17 or more
      console.log(`Dealer Stands with a score of ${score}`);
    } else {
      this.hit(deck); //dealer hits on 16 or less
      console.log(`Dealer Hits with a score of ${score}`);
    }
  }
}

module.exports = Dealer;
