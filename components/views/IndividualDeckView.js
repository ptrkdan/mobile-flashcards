import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { beige, white, lightGreen } from '../../utils/colours';

class IndividualDeckView extends Component {

  state = {
    deck: {
      title: '',
      questions: []
    }
  }

  componentDidMount() {
    const { navigation, decks } = this.props;

    this.setState({ deck: decks[navigation.state.params.title] });
  }

  render() {
    const { deck } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardCount}>{deck.questions.length} cards</Text>
        <View style={{ flex: 1 }} />
        {
          deck.questions.length > 0 ? (
            <TouchableOpacity style={styles.button}
              onPress={() => navigation.navigate('QuizView')}>
              <Text style={styles.buttonTitle}>Start a Quiz</Text>
            </TouchableOpacity>
          ) : null
        }
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('NewQuestionView', { title: deck.title })}>
          <Text style={styles.buttonTitle}>Create a New Question</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: beige,
    flex: 1,
    justifyContent: 'center'
  },
  cardCount: {
    fontSize: 20,
    alignSelf: 'center'
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto',
    alignSelf: 'center',
    marginTop: 100,
  },
  button: {
    backgroundColor: lightGreen,
    padding: 30,
    borderRadius: 4,
    margin: 20,
    shadowRadius: 5,
    shadowOpacity: 0.8,
    shadowColor: `rgba(0, 0, 0, 0.2)`,
    shadowOffset: {
      width: 2,
      height: 5
    }
  },
  buttonTitle: {
    fontSize: 24,
    alignSelf: 'center'
  },
});

mapStateToProps = ({ items }) => {
  return { decks: items };
}

export default connect(mapStateToProps)(IndividualDeckView);
