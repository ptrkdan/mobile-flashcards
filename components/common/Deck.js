import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { lightGreen } from '../../utils/colours';

class Deck extends Component {


  onPress = () => {
    const { navigation, deck } = this.props;
    navigation.navigate('IndividualDeckView', { title: deck.title });
  }

  render() {
    const { deck } = this.props;
    console.log('in Deck: ', deck);
    return (
      <TouchableOpacity style={styles.container}
        onPress={this.onPress} >
        <Text style={{ fontSize: 24 }}>{deck.title}</Text>
        <Text style={{ fontSize: 20 }}>{deck.questions.length} cards</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: lightGreen,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 3,
    margin: 20
  }
});

export default Deck;
