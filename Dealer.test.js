const Dealer = require("./Dealer");
const Player = require("./Player");
const Deck = require("./Deck");

describe("Dealer", () => {
  let dealer;
  let testDeck;
  const card10 = { rank: "10", value: 10 };
  const cardKing = { rank: "King", value: 10 };
  const card3 = { rank: "3", value: 3 };
  const cardAce = { rank: "Ace", value: 11 };
  const card4 = { rank: "4", value: 4 };
  const card9 = { rank: "9", value: 9 };
  const card6 = { rank: "6", value: 6 };
  const card5 = { rank: "5", value: 5 };

  beforeEach(() => {
    dealer = new Dealer();
    testDeck = new Deck();
  });

  it("should be an instance of Dealer and Player", () => {
    expect(dealer).toBeInstanceOf(Dealer); // Check if it is a Dealer instance
    expect(dealer).toBeInstanceOf(Player); // Check if it is also a Player instance
  });

  it("should have properties and methods from Player", () => {
    expect(dealer.name).toBe("Dealer");
    expect(typeof dealer.getScore).toBe("function");
    expect(typeof dealer.isBust).toBe("function");
  });

  it("should be able to deal 2 cards on the opening deal", () => {
    dealer.dealOpeningHand(testDeck);
    expect(dealer.hand.size()).toBe(2);
  });

  it("should be able to correctly identify if dealer must hit if they have a total hand value of 16 or less", () => {
    dealer.hand.addCard(card10);
    dealer.hand.addCard(card3);
    expect(dealer.getScore()).toBe(13);

    dealer.dealerMove(testDeck);
    expect(dealer.hand.size()).toBe(3);
    expect(dealer.getScore()).toBeGreaterThan(13);
  });

  it("should be able to correctly identify if dealer must stand if they have a total hand value of 17 or more", () => {
    dealer.hand.addCard(card10);
    dealer.hand.addCard(card9);
    expect(dealer.getScore()).toBe(19);

    dealer.dealerMove(testDeck);
    expect(dealer.hand.size()).toBe(2);
    expect(dealer.getScore()).toBe(19);
  });

  it("should count ace as 11 if it makes the dealers score 17 or more and ensure dealer cannot hit", () => {
    dealer.hand.addCard(card9);
    dealer.hand.addCard(cardAce);
    expect(dealer.getScore()).toBe(20);

    dealer.dealerMove(testDeck);
    expect(dealer.hand.size()).toBe(2);
  });

  it("should count ace as 11 and let the dealer hit if score is less than 17", () => {
    dealer.hand.addCard(cardAce);
    dealer.hand.addCard(card4);

    expect(dealer.getScore()).toBe(15);

    dealer.dealerMove(testDeck);
    expect(dealer.hand.size()).toBe(3);
    expect(dealer.getScore()).toBeGreaterThan(15);
  });

  it("should count later ace as 1 if hitting busts the dealer", () => {
    dealer.hand.addCard(cardAce);
    dealer.hand.addCard(card5);
    expect(dealer.getScore()).toBe(16);

    dealer.hand.addCard(cardAce); // must hit as score 16

    expect(dealer.getScore()).toBe(17);
  });

  it("should identify if the dealer is bust", () => {
    dealer.hand.addCard(card10);
    dealer.hand.addCard(card6);
    expect(dealer.getScore()).toBe(16);

    dealer.hand.addCard(cardKing);
    expect(dealer.getScore()).toBe(26);

    expect(dealer.isBust()).toBe(true);
  });
});
