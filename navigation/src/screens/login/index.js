import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {normalizeText} from '../../../../responsive-text';
import Button from '../../../../constants/custButton';
import {styles} from './style';
import auth from '@react-native-firebase/auth';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useTogglePasswordVisibility} from '../../../../components/passwordvisiblitytoggle';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from '../../../../redux toolkit/countreducer';
import { ApiCall } from '../../../../redux toolkit/apireducer';

export default function Login({navigation}) {
  // const [email, setemail] = useState({
  //   value: '',
  //   prefix: `${value}@gmail.com`,
  // });
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);
  // console.log('counter:', counter);
  const [email, setemail] = useState('kishan@gmail.com');
  const [password, setPassword] = useState('kishan');
  const [isloading, setisloading] = useState(false);
  const {handlePasswordVisibility, rightIcon, passwordVisibility} =
    useTogglePasswordVisibility();
  // useEffect(() => {}, []);

  async function loginHandler() {
    try {
      auth()
        .signOut()
        .then(success => console.log('Success in logout first', success))
        .catch(error => console.log('Error somewhere', error));
    } catch (error) {
      console.log('Error handler:', error);
    }

    if (email == '' || password == '') {
      alert('Please-Fill');
    } else {
      setisloading(true);
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Login-success');
          setisloading(false);
          setemail('');
          setPassword('');

          navigation.navigate('home', {email: email});
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            // console.log('That email address is invalid!');
          }
          Alert.alert('email/password is invalid!');
          // console.error(error);
          setisloading(false);
        });
    }
  }
  return (
    <View style={styles.maincontainer}>
      <View style={styles.innerView}>
        <Image
          source={require('../../../../assets/login.png')}
          style={styles.logostyle}
        />
        <Text style={styles.textstyle}>Login</Text>
      </View>
      <View style={{flex: 1}}>
        <TextInput
          style={styles.emailView}
          placeholder="Email"
          value={email}
          onChangeText={text => setemail(text)}
          keyboardType={'email-address'}
          // autoComplete={text => setemail(text + '@gmail.com')}
        />
        <View style={{justifyContent: 'center'}}>
          <TextInput
            style={styles.passView}
            placeholder="password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={passwordVisibility}
          />
          <View
            style={{
              position: 'absolute',
              marginStart: '85%',
            }}>
            <Pressable onPress={handlePasswordVisibility}>
              <Ionicon name={rightIcon} size={scale(20)} color={'purple'} />
            </Pressable>
          </View>
        </View>
        {isloading ? (
          <Button>
            <ActivityIndicator size={'small'} color={'white'} />
          </Button>
        ) : (
          <Button onpress={loginHandler}>Login</Button>
        )}
        <View>
          <Button
            onpress={() => {
              navigation.navigate('mobileverify');
            }}>
            Login with Mobile
          </Button>
        </View>
        <View style={styles.viewafterLogin}>
          <Pressable
            onPress={() => {
              navigation.navigate('register');
            }}>
            <Text style={styles.registerTxtStyle}>Register!</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              // dispatch(ApiCall());
            }}>
            <Text style={styles.registerTxtStyle}>Forgot Login?</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
