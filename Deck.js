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
    this.deck = [];
    this.buildDeck();
  }

  buildDeck() {
    this.deck = [];
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
    const totalCards = this.size()
    for(let currentIndex = totalCards -1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        
        const tempPosition = this.deck[currentIndex];
        this.deck[currentIndex] = this.deck[randomIndex];
        this.deck[randomIndex] = tempPosition;
    }
  }

  draw() {
    if(this.size() > 0) {
        return this.deck.pop();
    }
  }
}
// initiliase new deck
const myDeck = new Deck();

// shuffle deck
myDeck.shuffle()

const drawnCard = myDeck.draw()
console.log('Drawn Card:', drawnCard);

console.log(myDeck.deck);


module.exports = Deck;



