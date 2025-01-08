const Hand = require('./Hand');

describe('Hand', () => {
    let hand;

    beforeEach(() => {
        hand = new Hand();
    });

    it('should initialise with no cards', () => {
        expect(hand.size()).toBe(0);
      });

    it('should add a card to the hand', () => {
        hand.addCard({ label: '2', value: 2 });
        expect(hand.size()).toBe(1);
    })

    it('should calculate the total value of the hand', () => {
        hand.addCard({ label: '2', value: 2 });
        hand.addCard({ label: 'Jack', value: 10 });
        expect(hand.size()).toBe(2);
        expect(hand.getHandValue()).toBe(12);
    })


    
})