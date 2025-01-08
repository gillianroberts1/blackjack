class Deck {
  constructor() {
    this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    this.labels = [
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "6", value: 6 },
      { label: "7", value: 7 },
      { label: "8", value: 8 },
      { label: "9", value: 9 },
      { label: "10", value: 10 },
      { label: "Jack", value: 10 },
      { label: "Queen", value: 10 },
      { label: "King", value: 10 },
      { label: "Ace", value: 11 },
    ];
    this.deck = [];
    this.buildDeck();
  }

  buildDeck() {
    this.deck = [];
    for (const suit of this.suits) {
      for (const { label, value } of this.labels) {
        this.deck.push({ label, suit, value });
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



