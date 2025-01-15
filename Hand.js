class Hand {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  getHandValue() {
    let total = 0;
    let aces = 0;

    // calculate the total value of all cards in hand
    for (const card of this.cards) {
      total += card.value;
      if (card.rank === "Ace") {
        aces += 1; // count the number of aces
      }
    }

    // Adjust for aces if the total is over 21
    while (total > 21 && aces > 0) {
      total -= 10; // count ace as 1 instead of 11
      aces -= 1;
    }

    return total;
  }

  size() {
    return this.cards.length;
  }
}
module.exports = Hand;
