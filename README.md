# mobile-flashcards
Udacity React Nanodegree Program: Mobile Flashcards Project

A mobile app created by using React Native. Users create `decks` of `cards`, which has a question and an answer. Users may then quiz themselves using said decks. An optional daily notification may be sent to the user at a certain time.

## Installation
```
yarn install
yarn start
```


## Views
### Root View
- New decks can be added with the `Create a New Deck` button
- List all decks, showing each deck's title and the number of cards it contains
- Pressing on a deck routes users to the specific deck's `Individual Deck View`
- Pressing on the `Settings` button at the top right corner routes the users to the `Settings View`

### Individual Deck View
- Displays the deck title, the number of cards it contains, and two buttons: `Start a Quiz` and `Create a New Question`
- The `Start a Quiz` button will only show if the deck has 1 or more cards, and will open the `Quiz View`
- The `Create a New Question` button routes the users to the `New Question View`

### Quiz View
- Initially displays a random question from one card of the deck
- The title of the deck is shown on the top left, while the current question and the total number of questions are shown on the top right
- Users may toggle the question and answer by clicked the `Question` and `Answer` button, respectively.
- Users may mark their guess as `Correct` or `Incorrect` with the respective buttons
- The questions are randomly chosen from the cards in the deck
- Once all of the questions have been marked as correct or incorrect, the `Quiz Results View` is shown

### Quiz Results View
- Displays the number of questions correctly answers over the total number of questions, and the percentage of correct answers
- The `Restart Quiz` button returns the users to the `Quiz View`
- The `Back to Deck` button returns the users to the `Individual Deck View`

### New Deck View
- Displays an input field for the deck title
- The `Create Deck` button saves the deck, and routes the user to the new deck's `Individual Deck View`
- If the `Create Deck` button is pressed while the input field is empty, a validation error will display, and the user will stay on the view

### New Question View
- Displays a input field for a question and an answer
- The `Create Question` button saves the question, and returns the user to the `Individual Deck View` of the associated deck
- If the `Create Question` button is pressed while one or both input fields are empty, a validation error will display, and the user will stay on the view

## Notes
### Notifications
- Daily notifications can be turned on or off in the `Settings View`
- The user can decide on what time to be notified. Default is 21:30
- Pressing the `Save` button will save the settings, and return the user to the `Root View`
- Pressing the `<--` button will return the user to the `Root View` without saving
- Notifications will only be broadcasted if the user has not yet completed at least one quiz on that day
- If the user has completed a quiz, the notification will be removed from that day

## Testing
This app was tested on a Samsung Galaxy S7 Edge, using Android version 7.0.