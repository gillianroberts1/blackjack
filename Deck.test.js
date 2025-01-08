const Deck = require("./Deck");

describe("Deck", () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  it("should initiliase with 52 cards", () => {
    expect(deck.size()).toBe(52);
  });

  it('should shuffle the deck', () => {
    const originalOrder = [...deck.deck]; // making a copy of the deck
    deck.shuffle();
    expect(deck.size()).toBe(52);
    expect(deck.deck).not.toEqual(originalOrder)
  });

  it('should draw a card', () => {
    const drawnCard = deck.draw();
    expect(drawnCard).toBeDefined();
    expect(deck.size()).toBe(51);
    expect(deck.deck).not.toContain(drawnCard);
  })

  it('should not draw a card if the deck is empty', () => {
    deck.deck = [];
    const drawnCard = deck.draw();
    expect(drawnCard).toBeUndefined();
  })
});
