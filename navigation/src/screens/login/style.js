import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {normalizeText} from '../../../../responsive-text';

export const styles = StyleSheet.create({
  maincontainer: {flex: 1},
  innerView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  logostyle: {
    height: scale(200),
    width: scale(200),
  },
  textstyle: {
    padding: scale(10),
    fontSize: normalizeText(30),
    fontWeight: 'bold',
    color: 'purple',
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
    fontSize: normalizeText(14),
    marginBottom:scale(5)
  },
  viewafterLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
  },
  registerTxtStyle: {
    color: 'purple',
    fontSize: normalizeText(15),
    fontWeight: '500',
  },
});
