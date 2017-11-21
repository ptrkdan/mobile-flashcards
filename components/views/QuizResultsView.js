import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { beige, gray } from '../../utils/colours';

class QuizResultsView extends Component {

  toDeckView = (title) => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'IndividualDeckView', params: { title } })
        ]
      })
    );
  }

  render() {
    const { score, totalQuestions, navigation, deck } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Results</Text>
          <Text style={styles.score}>{score} / {totalQuestions}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('QuizView', { deck })}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => this.toDeckView(deck.title)}>
            <Text style={styles.buttonText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: beige,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    marginTop: 100
  },
  score: {
    fontSize: 30,
    marginTop: 20,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: gray,
    padding: 30,
    borderRadius: 4,
    margin: 20,
  },
  buttonText: {
    color: beige,
    fontSize: 24
  }

});

export default QuizResultsView;