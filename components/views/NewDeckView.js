import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { addDeck } from '../../actions';
import { beige, lightGreen } from '../../utils/colours';


class NewDeckView extends Component {

  state = {
    title: '',
    isTitleValid: true
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

  submitDeck = () => {
    const { title } = this.state;
    const { dispatch, navigation } = this.props;

    if(!title) {
      this.setState({ isTitleValid: false });
    } else {
      this.setState({ isTitleValid: true });
      dispatch(addDeck(title))
        .then(() => this.toDeckView(title));      
    }
  }

  render() {
    const { title, isTitleValid } = this.state;
    const { decks } = this.props;

    return (
      <View style={styles.container} >
        <Text style={styles.header}>Create a New Deck</Text>
        <View style={{ marginTop: 100 }} >
          <FormLabel>Deck Title</FormLabel>
          <FormInput value={title} onChangeText={ (title) => this.setState({ title }) } />
          <FormValidationMessage>
            { isTitleValid ? null : 'This field is required' }
          </FormValidationMessage>
        </View>
        <TouchableOpacity style={styles.button}
          onPress={this.submitDeck}>
          <Text style={{ fontSize: 20 }}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: beige,
    alignItems: 'center'
  },
  header: {
    marginTop: 40,
    fontSize: 42
  },
  button: {
    backgroundColor: lightGreen,
    padding: 20,
    borderRadius: 3,
    marginTop:40
  }
})

mapStateToProps = ({ decks }) => {
  return { decks: decks.items };
}

export default connect(mapStateToProps)(NewDeckView);
