import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { beige, gray } from '../../utils/colours';

class QuizResultsView extends Component {

  render() {
    const { score, totalQuestions, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Results</Text>
          <Text style={styles.score}>{score} / {totalQuestions}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Quiz', { deckName: 'TEST' })}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('IndividualDeck')}>
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