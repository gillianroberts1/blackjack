const Hand = require("./Hand");
const Deck = require("./Deck");



class Player {
  constructor(name) {
    this.name = name || "Player";
    this.hand = new Hand();
  }

  dealOpeningHand(deck) {
    const card1 = deck.draw();
    const card2 = deck.draw();


    this.hand.addCard(card1);
    this.hand.addCard(card2);
  }
  

  hit(deck) {
    const newCard = deck.draw();
    if (newCard && this.hasValidHand()) {
      this.hand.addCard(newCard);
    }
  }

  stand() {
    this.hand = this.hand;
  }

  hasValidHand() {
    return this.getScore() <= 21;
  }

  getScore() {
    return this.hand.getHandValue();
  }

  isBust() {
    return this.getScore() > 21;
  }
}

module.exports = Player;
