import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { addCard } from '../../actions/decks';
import { beige, lightGreen, gray } from '../../utils/colours';

class NewQuestionView extends Component {

  state = {
    question: '',
    answer: '',
    isQuestionValid: true,
    isAnswerValid: true
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

  validateForm = (question, answer) => {

    this.setState({
      isQuestionValid: !!question,
      isAnswerValid: !!answer
    });
    
    return (question && answer);
  }

  submitQuestion = () => {
    const { question, answer } = this.state;
    const { dispatch, navigation } = this.props;
    const { title } = navigation.state.params;

    if(this.validateForm(question, answer)) {
      dispatch(addCard(title, { question, answer }))
        .then(() => this.toDeckView(title));
    }

  }

  render() {
    const { question, answer, isQuestionValid, isAnswerValid } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Create a New Question</Text>
        <View>
          <FormLabel>Question</FormLabel>
          <FormInput value={question} 
            onChangeText={ (question) => this.setState({ question }) } />
          <FormValidationMessage>
            { isQuestionValid ? null : 'This field is required' }
          </FormValidationMessage>
          <FormLabel>Answer</FormLabel>
          <FormInput value={answer}
            onChangeText={ (answer) => this.setState({ answer }) } />
          <FormValidationMessage>
            { isAnswerValid ? null: 'This field is required' }
          </FormValidationMessage>
          <TouchableOpacity style={styles.button}
            onPress={this.submitQuestion}>
            <Text style={styles.buttonTitle}>Create Question</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: beige,
    flex: 1
  },
  header: {
    fontSize: 36,
    alignSelf: 'center',
    marginTop: 100,
  },
  button: {
    backgroundColor: lightGreen,
    padding: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: gray,
    margin: 20
  },
  buttonTitle: {
    fontSize: 24,
    alignSelf: 'center'
  },
});



export default connect()(NewQuestionView);
