import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {auth} from '@react-native-firebase/auth';

// screen
import Home from './src/screens/home';
import Register from './src/screens/register';
import Login from './src/screens/login';
import {AuthContext} from '../contextProvider';
import MobileVerify from './src/screens/MobileVerify';
import ListData from './src/screens/listdata';
import OnBoardingScreen from '../components/onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);

  useEffect(() => {
    checkForFirstTimeLoaded();
  }, []);
  //AsyncStorage
  const checkForFirstTimeLoaded = async () => {
    const result = await AsyncStorage.getItem('isFirstTimeOpen');
    console.log('result:', result);
    if (result == null) {
      setIsFirstTimeLoad(true);
      setLoading(false);
    } else {
      setIsFirstTimeLoad(false);
      setLoading(false);
    }
  };
  if (loading)
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator  size={'large'} color={'black'}/>
      </View>
    );

  //   const {user, setUser} = useContext(AuthContext);
  //   const [initializing, setInitializing] = useState(true);
  // console.log('Route-Src');
  //   function onAuthStateChanged(user) {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   }
  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     console.log('user', subscriber);
  //     return subscriber;
  //   }, []);
  // if (initializing) return null;

  if (isFirstTimeLoad)
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OnboardingScreen"
          screenOptions={{
            headerShown: false,
            // header: () => <MainHeader />,
          }}>
          <Stack.Screen name="OnboardingScreen" component={OnBoardingScreen} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="mobileverify" component={MobileVerify} />
          <Stack.Screen name="listscreen" component={ListData} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  if (!isFirstTimeLoad) return <Login />;
}
