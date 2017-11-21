import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white, beige, lightGreen, darkGreen, red } from '../../utils/colours';
import QuizResultsView from './QuizResultsView';

const QuestionCard = ({ question, toggleQA }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <Text style={styles.question}>{question}</Text>
      <TouchableOpacity style={[styles.button, styles.toggleQAButton]}
        onPress={toggleQA}>
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Answer</Text>
      </TouchableOpacity>
    </View>
  );
}

const AnswerCard = ({ answer, toggleQA }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <Text style={styles.question}>{answer}</Text>
      <TouchableOpacity style={[styles.button, styles.toggleQAButton]}
        onPress={toggleQA}>
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Question</Text>
      </TouchableOpacity>
    </View>
  );
}

class QuizView extends Component {
  

  selectNextCard = () => {
    const { questions } = this.state;

    this.setState({ card: questions.splice(Math.floor(Math.random() * questions.length), 1)[0] });
  }

  toggleQA = () => {
    this.setState({ isQuestion: !this.state.isQuestion })
  }

  nextQuestion = () => {
    const { currentQuestion, totalQuestions } = this.state;

    if (currentQuestion <= totalQuestions ) {
      this.setState ({ 
        currentQuestion: this.state.currentQuestion + 1,
        isQuestion: true
       });
      this.selectNextCard();
    }
  }

  increaseScore = () => {
    this.setState({ score: this.state.score + 1 });
    this.nextQuestion();
  }

  constructor(props) {
    super(props);

    const questions = this.props.navigation.state.params.deck.questions.slice();
    this.state = {
      isQuestion: true,
      currentQuestion: 1,
      totalQuestions: questions.length,
      card: questions.splice(Math.floor(Math.random() * questions.length), 1)[0],
      questions: questions,
      score: 0
    };

  }

  render() {
    const { isQuestion, currentQuestion, totalQuestions, questions, card, score } = this.state;
    const { navigation } = this.props;
    const { deck } = navigation.state.params;

    if ( currentQuestion <= totalQuestions ) {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.cardCount}>{currentQuestion} / {totalQuestions}</Text>
          </View>
          <View style={styles.quizContainer}>
          { isQuestion ? 
            <QuestionCard question={card.question} toggleQA={this.toggleQA} />
           :
            <AnswerCard answer={card.answer} toggleQA={this.toggleQA} />
          }
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
      return <QuizResultsView navigation={navigation} deck={deck} score={score} totalQuestions={totalQuestions} />
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