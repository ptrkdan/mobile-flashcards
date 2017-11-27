import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Mobile Flashcard Quiz Reminder',
    body: 'Practice makes perfect! Don\'t forget to do your practice today!',
    android: {
      sound: true,
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification(notificationHour='21', notificationMinute='0') {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then( (data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then( ({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(notificationHour);
              tomorrow.setMinutes(notificationMinute);
              tomorrow.setSeconds(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    })
}
