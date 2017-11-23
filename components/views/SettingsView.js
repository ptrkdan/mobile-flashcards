import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch, TimePickerAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { setNotificiationSettings } from '../../actions/notifications';
import { clearLocalNotifications, setLocalNotification } from '../../utils/notificationHelpers.js';
import { beige, lightGreen, darkGreen, gray, white } from '../../utils/colours';

class SettingsView extends Component {

  state = {
    isDailyNotificationOn: true,
    notificationHour: 21,
    notificationMinute: 30
  }

  setIsDailyNotificationOn = (isDailyNotificationOn) => {
    this.setState({ isDailyNotificationOn });
  }

  openTimePicker = async (currentHour, currentMinute) => {
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: currentHour,
      minute: currentMinute,
      is24Hour: true
    });

    if (action === 'timeSetAction') {
      this.setState({
        notificationHour: hour,
        notificationMinute: minute
      });
    }
  }

  save = () => {
    const { isDailyNotificationOn, notificationHour, notificationMinute } = this.state;
    const { dispatch, navigation } = this.props;

    clearLocalNotifications();
    dispatch(setNotificiationSettings(this.state));
    if(isDailyNotificationOn) {
      setLocalNotification(notificationHour, notificationMinute);
    }

    navigation.goBack(navigation.state.key);
  }

  componentDidMount() {
    const { isDailyNotificationOn, notificationHour, notificationMinute } = this.props.notifications;

    this.setState({
      isDailyNotificationOn,
      notificationHour,
      notificationMinute
    });
  }

  render() {
    const { isDailyNotificationOn, notificationHour, notificationMinute } = this.state;
    const { navigation, notifications } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: beige }}>
        <Text style={styles.header}>Settings</Text>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <MaterialIcons 
              name={'notifications-active'} 
              size={40}
            />
            <Text style={{ margin: 20, fontSize: 24 }}>Daily Notifications</Text>
            <Switch 
              value={isDailyNotificationOn} 
              onValueChange={this.setIsDailyNotificationOn} 
              onTintColor={darkGreen}
              thumbTintColor={lightGreen}
              tintColor={gray}
            />
          </View>
          <View style={[styles.rowCenter, styles.notificationToggleSection]}>
            <TouchableOpacity style={isDailyNotificationOn ? styles.button : [styles.button, { backgroundColor: gray }]}
              onPress={() => this.openTimePicker(notificationHour, notificationMinute)}
              disabled={!isDailyNotificationOn}
            >
              <View style={isDailyNotificationOn ? styles.rowCenter : [styles.rowCenter, { opacity: 0.3 }]}>
                <MaterialIcons
                  name={'access-time'}
                  size={40}
                />
                <Text style={{ fontSize: 40, marginLeft: 20 }}>
                  {`${notificationHour.toString().padStart(2,'0')}:${notificationMinute.toString().padStart(2,'0')}`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack(navigation.state.key)}>
              <MaterialIcons
                name={'arrow-back'}
                size={30}
                color={white}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]}
              onPress={this.save}>
              <Text style={{ fontSize: 24 }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: beige,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: gray,
    margin: 20,
    minHeight: 200
  },
  header: {
    margin: 20,
    fontSize: 36
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  notificationToggleSection: {
    justifyContent: 'space-around',
    minHeight: 80
  },
  button: {
    alignItems: 'center',
    backgroundColor: lightGreen,
    padding: 10,
    borderRadius: 3,
    borderWidth:1,
    borderColor: gray
  },
  cancelButton: {
    alignSelf: 'center',
    minHeight: 50,
    width: 100,
    margin: 20,
    backgroundColor: gray,
    borderWidth: 0
  },
  saveButton: {
    alignSelf: 'center',
    minHeight: 50,
    width: 150,
    margin: 20
  }
});

mapStateToProps = ({ notifications }) => {
  return { notifications };
}

export default connect(mapStateToProps)(SettingsView);