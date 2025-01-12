const Player = require("./Player");
const Deck = require("./Deck");

describe("Player", () => {
  let player;
  let testDeck;
  const card10 = { rank: "10", value: 10 };
  const cardKing = { rank: "King", value: 10 };
  const card3 = { rank: "3", value: 3 };
  const cardAce = { rank: "Ace", value: 11 };
  const cardQueen = { rank: "Queen", value: 10 };
  const card9 = { rank: "9", value: 9 };
  const card7 = { rank: "7", value: 7 };
  const card6 = { rank: "6", value: 6 };

  beforeEach(() => {
    player = new Player("Gillian");
    testDeck = new Deck();
  });

  it("should deal 2 cards on the opening hand", () => {
    player.dealOpeningHand(testDeck);
    expect(player.hand.size()).toBe(2);
  });

  it("should be able to receive another card by hitting, provided the hand is valid and update the score", () => {
    player.hand.addCard(card10);
    player.hand.addCard(card3);

    expect(player.hand.size()).toBe(2);
    expect(player.getScore()).toBe(13);
    expect(player.hasValidHand()).toBe(true);

    player.hit(testDeck); // unknown random card
    expect(player.hand.size()).toBe(3);
    expect(player.getScore()).toBeGreaterThan(13); // greater than initial score after 2 cards
  });

  it("should be able to choose to stand and not receive any more cards, provided the hand is valid and maintain the score", () => {
    player.hand.addCard(card10);
    player.hand.addCard(cardKing);

    expect(player.hand.size()).toBe(2);
    expect(player.getScore()).toBe(20);

    player.stand();
    expect(player.hand.size()).toBe(2);
    expect(player.getScore()).toBe(20);
  });

  it("should be able to assert hand is valid when score is 21 or less", () => {
    player.hand.addCard(cardKing);
    player.hand.addCard(cardAce);

    expect(player.getScore()).toBe(21);
    expect(player.hasValidHand()).toBe(true);
  });

  it("should be able to assert hand is bust when 22 or more", () => {
    player.hand.addCard(card10);
    player.hand.addCard(cardKing);
    player.hand.addCard(card3);

    expect(player.getScore()).toBe(23);
    expect(player.hasValidHand()).toBe(false);
    expect(player.isBust()).toBe(true);
  });

  it("should be able to correctly calculate than when given a king and an Ace the score is 21", () => {
    player.hand.addCard(cardKing);
    player.hand.addCard(cardAce);

    expect(player.getScore()).toBe(21);
  });

  it("should be able to correctly calculate than when given a king, Queen and an Ace the score is 21", () => {
    player.hand.addCard(cardKing);
    player.hand.addCard(cardQueen);
    player.hand.addCard(cardAce);

    expect(player.getScore()).toBe(21);
  });

  it("should be able to correctly calculate than when given a nine, an Ace and another Ace the score is 21", () => {
    player.hand.addCard(card9);
    player.hand.addCard(cardAce);
    player.hand.addCard(cardAce);

    expect(player.getScore()).toBe(21);
  });
});
