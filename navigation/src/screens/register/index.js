import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Button from '../../../../constants/custButton';
import {normalizeText} from '../../../../responsive-text';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {AccessToken, LoginButton, LoginManager} from 'react-native-fbsdk';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  useTogglePasswordVisibility,
  useToggleConfirmPasswordVisibility,
} from '../../../../components/passwordvisiblitytoggle';
export default function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isloading, setisloading] = useState(false);

  const {handlePasswordVisibility, rightIcon, passwordVisibility} =
    useTogglePasswordVisibility();
  const {
    confirmpasswordVisibility,
    confirmrightIcon,
    handleConfirmPasswordVisibility,
  } = useToggleConfirmPasswordVisibility();

  const validateEmail = Email => {
    // const re = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
    console.log('!re.test(Email):', re.test(Email));
    return re.test(Email);
  };
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    try{
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log('result:', result);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    // console.log('Data:', data);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    initUser(facebookCredential.token);
    console.log('Credentials:', facebookCredential);

    // Sign-in the user with the credential
    await auth()
      .signInWithCredential(facebookCredential)
      .then(navigation.navigate('home'));

    // await AccessToken.getCurrentAccessToken().then(data => {
    //   console.log('Data', data);
    //   const token = data.accessToken.toString();
    //   console.log(token);
    //   auth().signInWithCredential(data);
    // });
    }catch(err){
      if(err.code==='User cancelled the login process'){
        console.log('User cancelled the login process');
      }
    }
  }

  function onAuthStateChanged(user) {
    // console.log('User:', user);
  }
  useEffect(() => {
    const user = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;
    const subscriber = GoogleSignin.configure({
      webClientId:
        '576710080901-mq3t8qo1ldk08que5o0q8e78r9ckci1d.apps.googleusercontent.com',
    });
    console.log('subscriber: ', subscriber);
    return user;
  }, []);
  //
  async function SignupHandler() {
    if (email == '' || password == '' || confirmPass == '') {
      alert('Please Fill');
    } else if (validateEmail(email)) {
      if (password.length < 8) {
        alert('Atleast 8-char Required');
      } else if (password == confirmPass) {
        setisloading(true);
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            setisloading(false);
            navigation.navigate('home', {email: email});
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('User Already Exist');
              setisloading(false);
            }
          });
      } else {
        Alert.alert('Password Does not Match');
        setisloading(false);
      }
    } else {
      Alert.alert('Please Enter Proper Email');
    }
  }
  async function googleSigninHandler() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // console.log('idToken', idToken);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // console.log('googleCredentials', googleCredential);
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      navigation.navigate('home');
    } catch (err) {
      if (err.code === 'Sign in action cancelled') {
        console.log('Sign in action cancelled', err);
      }
    }
  }

  function initUser(token) {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' +
        token,
    )
      .then(response => {
        response.json().then(json => {
          // console.log('FB-Json', json);
          const ID = json.id;
          // console.log('ID ' + ID);

          const EM = json.email;
          // console.log('Email ' + EM);

          const FN = json.first_name;

          // console.log('First Name ' + FN);
        });
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK');
      });
  }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.maincontainer}>
      <View style={styles.innerView}>
        <Image
          source={require('../../../../assets/register.jpg')}
          style={styles.logostyle}
        />
        <Text style={styles.textstyle}>register !</Text>
      </View>

      <TextInput
        style={styles.emailView}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <View style={{justifyContent: 'center'}}>
        <TextInput
          style={styles.passView}
          placeholder="password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={passwordVisibility}
        />
        <View style={{position: 'absolute', marginStart: '85%'}}>
          <Pressable onPress={handlePasswordVisibility}>
            <Ionicon name={rightIcon} size={scale(20)} color={'purple'} />
          </Pressable>
        </View>
      </View>
      <View style={{justifyContent: 'center'}}>
        <TextInput
          style={styles.confirmPass}
          value={confirmPass}
          placeholder="Confirm password"
          onChangeText={text => setConfirmPass(text)}
          secureTextEntry={confirmpasswordVisibility}
        />

        <View
          style={{
            position: 'absolute',
            marginStart: '85%',
          }}>
          <Pressable onPress={handleConfirmPasswordVisibility}>
            <Ionicon
              name={confirmrightIcon}
              size={scale(20)}
              color={'purple'}
            />
          </Pressable>
        </View>
      </View>

      {isloading ? (
        <Button>
          <ActivityIndicator size={'small'} color={'white'} />
        </Button>
      ) : (
        <Button onpress={SignupHandler}>Sign-Up</Button>
      )}

      <View style={styles.viewafterLogin}>
        <View style={styles.loginwithGoogleView}>
          <TouchableOpacity onPress={googleSigninHandler}>
            <Image
              source={require('../../../../assets/google.png')}
              style={styles.imgStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onFacebookButtonPress}>
            <Image
              source={require('../../../../assets/fb.png')}
              style={{height: scale(40), width: scale(40)}}
            />
          </TouchableOpacity>
          {/* <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    initUser(data.accessToken.toString());
                    console.log(data.accessToken.toString());
                  });
                }
              }}
              onLogoutFinished={() => console.log('logout.')}
            /> */}
        </View>
        <View style={{flex: 1}}>
          <Pressable
            onPress={() => {
              navigation.navigate('login');
            }}>
            <Text style={styles.alreadyUserTxt}>Already a User!</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
