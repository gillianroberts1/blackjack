# Blackjack ♡ ♢ ♤ ♧ 

## Overview
Welcome to the Blackjack console game! This project is a simple implementation of the classic casino game, where you play against the dealer. The game is built in javascript and runs in the terminal.

## Features

- Player vs. Dealer gameplay
- Shuffled deck of cards
- Adheres to traditional Blackjack rules
  - Dealer stands at 17 or higher
  - Dealer hits at 16 or lower
  - Aces count as 1 or 11 depending on the value
- Handles player action: `hit` or `stand`
- Displays final results with scores

## Getting started

### Prerequisites

Ensuire you have Node.js installed on your machine.

### Installation

1. Clone this repository:
   - git@github.com:gillianroberts1/blackjack.git

2. Navigate to the project directory
   - cd Blackjack_bbc_techtest

3. Install dependancies
   - npm install

4. Run the game:
   - node main.js

## Tests

Unit test for for core functionality are implemented using `Jest`. You can run the test suite with the following command:
  - npx jest

### MVP Test Cases

The following scenarios were prioritised for the purpose of the assessment, these are within `Player.test.js`:

- Given I play a game of blackjack
When I am dealt my opening hand
Then I have two cards

- Given I have a valid hand of cards
When I choose to ‘hit’
Then I receive another card
And my score is updated

- Given I have a valid hand of cards
When I choose to ‘stand’
Then I receive no further cards
And my score is evaluated

- Given my score is updated or evaluated
When it is 21 or less
Then I have a valid hand

- Given my score is updated
When it is 22 or more 
Then I am ‘bust’ and do not have a valid hand

- Given I have a king and an ace
When my score is evaluated
Then my score is 21

- Given I have a king, a queen, and an ace
When my score is evaluated
Then my score is 21

- Given that I have a nine, an ace, and another ace
When my score is evaluated
Then my score is 21	

## Example Gameplay

Here's what the game might look like in the terminal:

Welcome to Blackjack!

Dealer's Hand:
  Ace Clubs
  [Hidden Card]

Your Hand:
  3 Clubs
  Queen Hearts
Total: 13

Do you want to (h)it or (s)tand? 

## Future Improvements
- Allow multiple players
- Allow players to bet using chips
- Add html or convert to React to allow game to be played in the browser
