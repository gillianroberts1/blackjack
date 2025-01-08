const Hand = require("./Hand");

class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Hand();
  }

  receiveCard(card) {
    this.hand.addCard(card);
  }

  getHandValue() {
    return this.hand.getHandValue();
  }

  isBust() {
    return this.getHandValue() > 21
  }

  showHand() {
    return this.hand.cards
      .map((card) => `${card.rank} of ${card.suit}`)
      .join(", ");
  }
}

module.exports = Player;
