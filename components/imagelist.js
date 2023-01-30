import React, {useState} from 'react';
import {Image, View, Button,Text} from 'react-native';

export default function ImgList({item = {}, index = -1}) {
  const {imgPath = ''} = item;
  const [btn, setbtn] = useState('button');

  const validateEmail = Email => {
    // const re = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
    console.log('!re.test(Email):', re.test(Email));
    return re.test(Email);
  };

  return (
    <View>
      <Image
        source={{uri: imgPath}}
        style={{height: 150, width: 150, backgroundColor: 'red'}}
      />
      <Text testID='my text'>{btn}</Text>
      {/* <Text style={{justifyContent: 'center', textAlign: 'center'}}>{}</Text> */}
      <Button testID='my button' title='pressbtn' onPress={()=>{setbtn('Not-button')}}/>
    </View>
  );
}
