import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFcmToken();
  }
}

async function GetFcmToken() {
  const oldfcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log('Old FcmToken:', oldfcmtoken);
  if (!oldfcmtoken) {
    try {
      const newfcmToken = await messaging().getToken();
      if (newfcmToken) {
        await AsyncStorage.setItem('fcmToken', newfcmToken);
        console.log('New FcmToken:', newfcmToken);
      }
    } catch (error) {
      console.log('Error in FcmToken:', error);
    }
  }
}

export function NotificationListner() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remotemessge => {
    console.log('receive Forerground Message', remotemessge);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
}
