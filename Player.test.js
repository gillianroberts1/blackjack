const Player = require("./Player");
const Hand = require("./Hand");

describe("Player", () => {
  let player;

  beforeEach(() => {
    player = new Player("Gillian");
  });

  it("should initialise with a name and an empty hand", () => {
    expect(player.name).toBe("Gillian");
    expect(player.getHandValue()).toBe(0);
  });

  it("should add a card to the players hand", () => {
    player.receiveCard({ rank: "5", value: 5 });
    expect(player.getHandValue()).toBe(5);
    expect(player.hand.size()).toBe(1);
  });

  it("should calculate the total value of the players hand correctly", () => {
    player.receiveCard({ rank: "10", value: 10 });
    player.receiveCard({ rank: "Queen", value: 10 });
    expect(player.getHandValue()).toBe(20);
  });

  it("should calculate the total value of the players hand correctly when an ace is played and total is less than 21", () => {
    player.receiveCard({ rank: "10", value: 10 });
    player.receiveCard({ rank: "Ace", value: 11 });
    expect(player.getHandValue()).toBe(21);
  });

  it("should calculate the total value of the players hand correctly when an ace is played and total is more than 21", () => {
    player.receiveCard({ rank: "10", value: 10 });
    player.receiveCard({ rank: "Queen", value: 10 });
    player.receiveCard({ rank: "Ace", value: 11 });
    expect(player.getHandValue()).toBe(21);
  });

  it("should display the players cards as a string", () => {
    player.receiveCard({ rank: "King", value: 10, suit: "Clubs" });
    player.receiveCard({ rank: "9", value: 9, suit: "Hearts" });
    expect(player.showHand()).toBe('King of Clubs, 9 of Hearts')
  });
});
