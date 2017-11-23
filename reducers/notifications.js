import * as Types from '../actions/types';

const initNotificationState = {
  lastQuizDate: null,
  isDailyNotificationOn: true,
  notificationHour: 21,
  notificationMinute: 0
}

export default function notifications(state = initNotificationState, action) {
  switch(action.type) {
    case Types.SET_LAST_QUIZ_DATE:
      return { 
        ...state,
        lastQuizDate: action.lastQuizDate 
      };
    case Types.SET_DAILY_NOTIFICATION_ON:
      return {
        ...state,
        isDailyNotificationOn: action.isDailyNotificationOn
      };
    case Types.SET_NOTIFICATION_TIME:
      return {
        ...state,
        notificationHour: action.notificationHour,
        notificationMinute: action.notificationMinute
      };
    default:
      return state;
  }
}