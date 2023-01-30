import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({Childern}) => {
  const [user, setUser] = useState(null);
console.log('AuthProvider');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async () => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log('Error', e);
          }
        },
        register: async () => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log('Error', e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log('Error', e);
          }
        },
      }}>
      {Childern}
    </AuthContext.Provider>
  );
};
