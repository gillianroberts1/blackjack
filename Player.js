const Hand = require("./Hand");

class Player {

  // Initialise the player with a name and empty hand
  constructor(name) {
    this.name = name || "Player";  // Default name is "Player" if no name is passed
    this.hand = new Hand(); // Players hand starts as an empty Hand object
  }

  dealOpeningHand(deck) {

    // Deals two cards to the player from the deck
    const card1 = deck.draw();
    const card2 = deck.draw();

    this.hand.addCard(card1);
    this.hand.addCard(card2);
  }

  getScore() {
    // Calculate and return the total value of the players hand
    return this.hand.getHandValue();
  }

  hasValidHand() {
    // Check if players hand is valid (21 or less)
    return this.getScore() <= 21;
  }

  hit(deck) {
    // Allows the player to draw another card if the hand is valid
    const newCard = deck.draw();
    if (newCard && this.hasValidHand()) {
      // Only add a card if a new card exists (deck was not empty) and if the hand is valid
      this.hand.addCard(newCard);
    }
  }

  stand() {
    // Player choosing not to draw any more cards and will not change state of the players hand
    this.hand = this.hand;

  }

  isBust() {
    // Check if players hand has gone over 21
    return this.getScore() > 21;
  }
}

module.exports = Player;
