// Mock user input for Jest tests
jest.mock("readline", () => ({
  createInterface: () => ({
    question: (query, callback) => callback("s"), // Mock input as 'stand'
    close: jest.fn(),
  }),
}));

const Game = require("./Game");

describe("Game", () => {
  let game;
  let player;
  let dealer;
  const card10 = { rank: "10", value: 10, suit: "Clubs" };
  const cardKing = { rank: "King", value: 10, suit: "Hearts" };
  const card3 = { rank: "3", value: 3, suit: "Diamonds" };
  const cardAce = { rank: "Ace", value: 11, suit: "Spades" };
  const cardQueen = { rank: "Queen", value: 10, suit: "Clubs" };
  const card9 = { rank: "9", value: 9, suit: "Hearts" };
  const card7 = { rank: "7", value: 7 };
  const card6 = { rank: "6", value: 6 };

  beforeEach(() => {
    game = new Game();
    player = game.player; //get the player from the game instance
    dealer = game.dealer; // get the dealer from the game instance
    testDeck = game.deck; // get the deck from the game instance
  });

  // Test start method
  it("should deal 2 cards each to the dealer and player at the start of a game", () => {
    game.start();
    expect(dealer.hand.size()).toBe(2);
    expect(player.hand.size()).toBe(2);
  });

  it("should display dealer hand, hiding the second card and the players hand showing both cards along with the players current score", () => {
    // Mock console.log to capture outputs
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Mock dealOpeningHands Method
    jest.spyOn(game, "dealOpeningHands").mockImplementation(() => {
      game.dealer.hand.cards = [cardKing, cardQueen]; // Mock dealers hand
      game.player.hand.cards = [card10, card3]; // Mock players hand
    });

    game.start();

    // Dealer
    expect(dealer.hand.size()).toBe(2);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, "Welcome to Blackjack!");
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "  King of Hearts"); // dealers first card
    expect(consoleSpy).toHaveBeenNthCalledWith(4, "  [Face Down Card]"); // dealers second card

    // Player
    expect(player.hand.size()).toBe(2);
    expect(consoleSpy).toHaveBeenNthCalledWith(5, "\nYour Hand:");
    expect(consoleSpy).toHaveBeenNthCalledWith(6, "  10 of Clubs"); // players first card
    expect(consoleSpy).toHaveBeenNthCalledWith(7, "  3 of Diamonds"); // players second card

    // Restore mocks
    consoleSpy.mockRestore();
    game.dealOpeningHands.mockRestore();
  });

  // Tests to do:
  // test player turn is actioned
  // test dealers turn is actioned
  // test outcome is determined and displayed
});
