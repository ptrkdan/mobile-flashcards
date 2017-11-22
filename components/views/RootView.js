import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { retrieveAllDecks } from '../../actions';
import Deck from '../common/Deck';
import { white, beige, lightGreen } from '../../utils/colours';

class RootView extends Component {

  onPressNewDeck = () => {
    this.props.navigation.navigate('NewDeckView');
  }

  keyExtractor = (item, index) => index;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(retrieveAllDecks());
  }

  render() {
    const { navigation, decks } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Mobile Flashcards</Text>
        <TouchableOpacity style={styles.button}
          onPress={this.onPressNewDeck}>
          <Text style={{ fontSize: 20 }} >Create a New Deck</Text>
        </TouchableOpacity>
        <View style={styles.deckListContainer}>
          <FlatList
            data={Object.values(decks)}
            keyExtractor={this.keyExtractor}
            renderItem={ ({ item }) => (
              <Deck navigation={navigation} deck={item} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: beige
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 42
  },
  deckListContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 10
  },
  button: {
    justifyContent: 'center',
    backgroundColor: lightGreen,
    padding: 20,
    borderRadius: 3
  }

})

const mapStateToProps = ({ decks }) => {
  return { decks: decks.items };
}

export default connect(mapStateToProps)(RootView);
