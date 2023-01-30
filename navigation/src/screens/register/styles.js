import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {normalizeText} from '../../../../responsive-text';

export const styles = StyleSheet.create({
  maincontainer: {flex: 1, backgroundColor: 'white'},
  innerView: {justifyContent: 'center', alignItems: 'center'},
  logostyle: {
    height: scale(200),
    width: scale(200),
  },
  textstyle: {
    textAlign: 'auto',
    fontSize: normalizeText(20),
    fontWeight: 'bold',
    color: 'purple',
    padding: scale(8),
  },
  emailView: {
    padding: scale(10),
    backgroundColor: '#ccc',
    marginHorizontal: scale(20),
    borderRadius: scale(10),
    marginBottom: scale(10),
    color: 'black',
    fontSize: normalizeText(14),
  },
  passView: {
    padding: scale(10),
    backgroundColor: '#ccc',
    marginHorizontal: scale(20),
    borderRadius: scale(10),
    color: 'black',
    marginBottom: scale(10),
    fontSize: normalizeText(14),
  },
  confirmPass: {
    padding: scale(10),
    backgroundColor: '#ccc',
    marginHorizontal: scale(20),
    borderRadius: scale(10),
    color: 'black',
    fontSize: normalizeText(14),
  },
  viewafterLogin: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: scale(20),
    alignItems: 'center',
  },
  loginwithGoogleView: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imgStyle: {height: scale(50), width: scale(50)},
  alreadyUserTxt: {
    color: 'purple',
    fontSize: normalizeText(15),
    fontWeight: '500',
  },
  registerTxtStyle: {
    color: 'purple',
    fontSize: normalizeText(15),
    fontWeight: '500',
  },
});
