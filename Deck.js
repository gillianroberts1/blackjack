class Deck {
  constructor() {
    this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    this.ranks = [
      { rank: "2", value: 2 },
      { rank: "3", value: 3 },
      { rank: "4", value: 4 },
      { rank: "5", value: 5 },
      { rank: "6", value: 6 },
      { rank: "7", value: 7 },
      { rank: "8", value: 8 },
      { rank: "9", value: 9 },
      { rank: "10", value: 10 },
      { rank: "Jack", value: 10 },
      { rank: "Queen", value: 10 },
      { rank: "King", value: 10 },
      { rank: "Ace", value: 11 },
    ];

    // Initialise an empty array to hold the cards in the deck
    this.deck = [];
    // Call build deck function in constructor so new deck has 52 cards when initialised
    this.buildDeck();
  }

  // Build the deck
  buildDeck() {
    // start with an empty deck
    this.deck = [];
    // nested loop to create a card of each rank and value for each suit
    for (const suit of this.suits) {
      for (const { rank, value } of this.ranks) {
        this.deck.push({ rank, suit, value });
      }
    }
  }
  size() {
    return this.deck.length;
  }

  shuffle() {
    // Shuffle deck using Fisher-Yates shuffle algorithm
    const totalCards = this.size();
    for (let currentIndex = totalCards - 1; currentIndex > 0; currentIndex--) {
      // Pick a random index
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      // Swap the current card with the card at the random index
      const tempPosition = this.deck[currentIndex];
      this.deck[currentIndex] = this.deck[randomIndex];
      this.deck[randomIndex] = tempPosition;
    }
  }

  draw() {
    // Remove and return the top card from the deck
    if (this.size() > 0) {
      return this.deck.pop();
    }
  }
}

module.exports = Deck;
