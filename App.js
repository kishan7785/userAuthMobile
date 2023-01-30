import React, {useEffect} from 'react';
import {
  requestUserPermission,
  NotificationListner,
} from './utils/noteficationService';
import {Provider} from 'react-redux';
import {persistor, store} from './redux toolkit/store';
// SCREENS
import Routes from './navigation';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
  }, []);

  // console.log('store:',store.getState());
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
