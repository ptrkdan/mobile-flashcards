import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { updateLastQuizDate } from '../../actions/notifications';
import { clearLocalNotifications, setLocalNotification } from '../../utils/notificationHelpers.js';
import { beige, gray } from '../../utils/colours';

class QuizResultsView extends Component {

  toQuizView = (deck) => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index:2,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'IndividualDeckView', params: { title: deck.title } }),
          NavigationActions.navigate({ routeName: 'QuizView', params: { deck } })
        ]
      })
    );
  }

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

  componentDidMount() {
    const { lastQuizDate, notificationHour, notificationMinute } = this.props.notifications;
    const today = new Date().toDateString();

    if (today !== lastQuizDate) {
      clearLocalNotifications();
      setLocalNotification(notificationHour, notificationMinute);
      this.props.dispatch(updateLastQuizDate(today));
    }
  }

  render() {
    const { score, totalQuestions, navigation, deck } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Results</Text>
          <Text style={styles.score}>{score} / {totalQuestions}</Text>
          <Text style={styles.score}>({`${(score/totalQuestions*100).toFixed(2)}%`})</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.button}
            onPress={() => this.toQuizView(deck)}>
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
    marginTop: 20
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

mapStateToProps = ({ notifications }) => {
  return { notifications };
}

export default connect(mapStateToProps)(QuizResultsView);