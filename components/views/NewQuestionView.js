import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { beige, lightGreen } from '../../utils/colours';

class NewQuestionView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Create a New Question</Text>
        <View>
          <FormLabel>Question</FormLabel>
          <FormInput autofocus />
          <FormValidationMessage>
            { false ? 'This field is required' : null }
          </FormValidationMessage>
          <FormLabel>Answer</FormLabel>
          <FormInput />
          <FormValidationMessage>
            { false ? 'This field is required' : null }
          </FormValidationMessage>
          <TouchableOpacity style={styles.button}>
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
    margin: 20
  },
  buttonTitle: {
    fontSize: 24,
    alignSelf: 'center'
  },
});

export default NewQuestionView;
