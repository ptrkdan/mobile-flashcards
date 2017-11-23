import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { lightGreen, gray } from '../../utils/colours';

export default class Deck extends Component {


  toDeckView = () => {
    const { navigation, deck } = this.props;
    navigation.navigate('IndividualDeckView', { title: deck.title });
  }

  render() {
    const { deck } = this.props;
    return (
      <TouchableOpacity style={styles.container}
        onPress={this.toDeckView}>
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
    borderWidth:1,
    borderColor: gray,
    margin: 20
  }
});
