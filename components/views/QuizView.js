import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white, beige, lightGreen, darkGreen, red } from '../../utils/colours';
import QuizResultsView from './QuizResultsView';

class QuizView extends Component {
  state = {
    isQuestion: true,
    currentQuestion: 1,
    totalQuestions: 10,
    score: 0
  }

  toggleQA = () => {
    this.setState({ isQuestion: !this.state.isQuestion })
  }

  nextQuestion = () => {
    this.setState ({ currentQuestion: this.state.currentQuestion + 1 });
  }

  increaseScore = () => {
    this.setState({ score: this.state.score + 1 });
    this.nextQuestion();
  }

  componentDidMount() {
    this.setState({
      isQuestion: true,
      currentQuestion: 1,
      totalQuestions: 10,
      score: 0
    });
  }

  render() {
    const { isQuestion, currentQuestion, totalQuestions, score } = this.state;
    const { navigation } = this.props;

    if ( currentQuestion <= totalQuestions ) {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{'[Deck Name]'}</Text>
            <Text style={styles.cardCount}>{currentQuestion} / {totalQuestions}</Text>
          </View>
          <View style={styles.quizContainer}>
          { isQuestion ? ( 
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <Text style={styles.question}>{'How much would could a woodchuck chuck if a woodchuck could chuck wood?'}</Text>
              <TouchableOpacity style={[styles.button, styles.toggleQAButton]}
                onPress={this.toggleQA}>
                <Text style={{ fontSize: 20, alignSelf: 'center' }}>Answer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <Text style={styles.question}>{'A woodchuck could chuck as much wood as a woodchuck could chuck wood.'}</Text>
              <TouchableOpacity style={[styles.button, styles.toggleQAButton]}
                onPress={this.toggleQA}>
                <Text style={{ fontSize: 20, alignSelf: 'center' }}>Question</Text>
              </TouchableOpacity>
            </View>
          )}
          </View>
          <View style={{ flex: 2 }}>
            <TouchableOpacity style={[styles.button, styles.buttonCorrect]}
              onPress={this.increaseScore}>
              <Text style={styles.buttonTitle}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonIncorrect]}
              onPress={this.nextQuestion}>
              <Text style={styles.buttonTitle}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <QuizResultsView navigation={navigation} score={score} totalQuestions={totalQuestions} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: beige,
    flex: 1,
    justifyContent: 'flex-start'
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto',
    alignSelf: 'center',
    paddingLeft: 20
  },
  cardCount: {
    fontSize: 20,
    alignSelf: 'center',
    paddingRight: 20
  },
  quizContainer: {
    flex: 2,
    backgroundColor: white,
    margin: 10,
    borderRadius: 5,
    padding: 20
  },
  question: {
    alignSelf: 'center',
    fontSize: 24
  },
  button: {
    padding: 30,
    borderRadius: 4,
    margin: 20,
  },
  toggleQAButton: {
    padding:10,
    borderWidth: 0.5
  },
  buttonCorrect: {
    backgroundColor: lightGreen
  },
  buttonIncorrect: {
    backgroundColor: red
  },
  buttonTitle: {
    fontSize: 24,
    alignSelf: 'center'
  },
});

export default QuizView;