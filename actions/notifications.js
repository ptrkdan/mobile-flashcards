import * as AsyncAPI from '../utils/asyncAPI';
import * as Types from './types';

export function setLastQuizDate(lastQuizDate) {
  return {
    type: Types.SET_LAST_QUIZ_DATE,
    lastQuizDate
  };
}
export function setDailyNotificationOn(isDailyNotificationOn) {
  return {
    type: Types.SET_DAILY_NOTIFICATION_ON,
    isDailyNotificationOn
  };
}
export function setNotificationTime(notificationHour, notificationMinute) {
  return {
    type: Types.SET_NOTIFICATION_TIME,
    notificationHour,
    notificationMinute
  }
}

export function retrieveNotificationSettings() {

  return function(dispatch) {

    return AsyncAPI.getNotificationSettings()
      .then((data) => {
        if (!data.notificationHour || !data.notificationMinute) {
          dispatch(setDailyNotificationOn(true));
          dispatch(setNotificationTime(21, 0));
        } else {
          dispatch(setLastQuizDate(data.lastQuizDate));
          dispatch(setDailyNotificationOn(data.isDailyNotificationOn));
          dispatch(setNotificationTime(data.notificationHour, data.notificationMinute));
        }
      });
  }
}

export function updateLastQuizDate(lastQuizDate) {

  return function(dispatch) {
    dispatch(setLastQuizDate(lastQuizDate));
    return AsyncAPI.setLastQuizDate(lastQuizDate);
  }

}

export function setNotificiationSettings(notificationSettings) {

  return function(dispatch) {
    dispatch(setLastQuizDate(notificationSettings.lastQuizDate));
    dispatch(setDailyNotificationOn(notificationSettings.isDailyNotificationOn));
    dispatch(setNotificationTime(notificationSettings.notificationHour, notificationSettings.notificationMinute));
    return AsyncAPI.setNotificationSettings(notificationSettings);
  }
}
