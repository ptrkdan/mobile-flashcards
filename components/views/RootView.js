import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import Deck from '../common/Deck';
import { retrieveAllDecks} from '../../actions/decks';
import { retrieveNotificationSettings } from '../../actions/notifications';
import { white, beige, lightGreen, gray } from '../../utils/colours';

class RootView extends Component {

  toNewDeckView = () => {
    this.props.navigation.navigate('NewDeckView');
  }

  // Used for FlatList component
  keyExtractor = (item, index) => index;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(retrieveAllDecks());
    dispatch(retrieveNotificationSettings());
  }

  render() {
    const { navigation, decks } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingsButton}
          onPress={() => navigation.navigate('SettingsView')}>
          <MaterialIcons name={'settings'} size={40} />
        </TouchableOpacity>
        <Text style={styles.header}>Mobile Flashcards</Text>
        <TouchableOpacity style={styles.button}
          onPress={this.toNewDeckView}>
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
    marginTop: 10,
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
    borderRadius: 3,
    borderWidth:1,
    borderColor: gray
  },
  settingsButton: {
    alignSelf: 'flex-end',
    margin: 10
  }

})

const mapStateToProps = ({ decks }) => {
  return { decks: decks.items };
}

export default connect(mapStateToProps)(RootView);
