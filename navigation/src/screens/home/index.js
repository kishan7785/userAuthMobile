import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Button from '../../../../constants/custButton';
import auth from '@react-native-firebase/auth';
import {normalizeText} from '../../../../responsive-text';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import DocumentPicker, {types} from 'react-native-document-picker';
import FSInfoResult, {stat} from 'react-native-fs';
import storage, {
  firebase,
  FirebaseStorageTypes,
} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import CreateThumbnail, {createThumbnail} from 'react-native-create-thumbnail';
import RNFB from 'rn-fetch-blob';
import GroundBooking from '../groundbooking';
export default function Home({route, navigation}) {
  const [imageuri, setimageuri] = useState();
  const [videouri, setVideouri] = useState();
  const [imgRepData, setimgResData] = useState(
    'https://w7.pngwing.com/pngs/169/93/png-transparent-jpg-filetype-icon-thumbnail.png',
  );
  const [filetype, setFiletype] = useState('');
  const [islogout, setIslogout] = useState(false);
  const [name, setName] = useState('');
  const [contenttype, setContentType] = useState('photo');
  const [uploading, setuploading] = useState(false);
  const [transferCount, setTransferCount] = useState(0);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  async function requestStoragePermission() {
    if (Platform.OS !== 'android') return true;

    const pm1 = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    const pm2 = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (pm1 && pm2) return true;

    const userResponse = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      userResponse['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
      userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
    ) {
      return true;
    } else {
      return false;
    }
  }

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    // console.log('function called');

    let options = {
      mediaType: type,
      minWidth: 1000,
      minHeight: 1000,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      // selectionLimit: 2,
    };

    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          // alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          // alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          // alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          // alert(response.errorMessage);
          return;
        }

        // if (options.mediaType == 'video') {
        //   console.log('Response-:', response?.assets[0]?.uri);
        //   // setimageuri(res.path);
        //   setimageuri(response?.assets[0]?.uri);
        //   setContentType('video');
        //   // setVideouri(response?.assets[0]?.uri);
        //   setFiletype('video');
        // } else {
        //   setContentType(type);
        //   console.log('Response-:', response?.assets[0]?.uri);

        //   setimgResData(response?.assets[0]?.uri);
        //   setimageuri(response?.assets[0]?.uri);
        //   setFiletype(type);
        // }
      })
        .then(res => {
          let data = [];
          setimgResData(res?.assets[0]?.uri);
          if (options.mediaType == 'video') {
            RNFB.fs
              .stat(res?.assets[0]?.uri)
              .then(set => {
                // console.log('');
                setimgResData(set.path);
                setVideouri(set.path);
                console.log('res-After:', set.path);
                setContentType(type);
                // setimageuri(set.path);
                data.push(set.path);
                setFiletype(type);
              })
              .catch(error => {
                console.log('Error in FsInfoResult:', error);
              });
            setimageuri(data);
            // setimageuri(res?.assets[0]?.uri);
            // setimgResData(res?.assets[0]?.uri);
            // setContentType('video');
            // setFiletype('video');
          } else {
            console.log('result:', res);

            // setimageuri(res[0].uri);
            // setimageuri(res[0].uri);
            RNFB.fs
              .stat(res?.assets[0]?.uri)
              .then(set => {
                // console.log('');
                console.log('res-After:', set.path);
                setContentType(type);
                // setimageuri(set.path);
                data.push(set.path);
                setFiletype(type);
                // setimgResData(set.path);
              })
              .catch(error => {
                console.log('Error in FsInfoResult:', error);
              });
            setimageuri(data);
          }
        })
        .catch(error => {
          console.log('Error in FsInfoResult:', error);
        });
    }
  };

  const chooseFile = (type, selectionlimit) => {
    // let selectionLimit = 2;
    let options = {
      mediaType: type,
      minWidth: 1000,
      minHeight: 1000,
      quality: 1,
      selectionLimit: selectionlimit,
    };

    // Using Document Picker

    if (type == 'video') {
      DocumentPicker.pick({
        allowMultiSelection: true,
        type: [types.video],
        selectionLimit: selectionlimit,
      })
        .then(res => {
          console.log('result:', res);
          let data = [];
          // setimageuri(res[0].uri);
          // setimageuri(res[0].uri);

          res?.forEach((item, index) => {
            RNFB.fs
              .stat(
                // '//com.android.providers.media.documents/document/video%3A38',
                item.uri,
              )
              .then(set => {
                // console.log('');
                console.log('res-After:', set.path);
                setContentType(type);
                // setimageuri(set.path);
                data.push(set.path);
                setFiletype(type);
                setimgResData(set.path);
                setVideouri(set.path);
              })
              .catch(error => {
                console.log('Error in FsInfoResult:', error);
              });
            setimageuri(data);
          });
        })
        .catch(error => {
          console.log('Error in Document Picker:', error);
        });
      console.log('videouri:', videouri);
    } else {
      //for image
      DocumentPicker.pick({
        allowMultiSelection: true,
        type: [types.images],
        selectionLimit: selectionlimit,
      })
        .then(res => {
          console.log('result:', res[0].uri);
          setimgResData(res[0].uri);
          let data = [];
          // setimageuri(res[0].uri);
          res?.forEach((item, index) => {
            RNFB.fs
              .stat(
                // '//com.android.providers.media.documents/document/video%3A38',
                item.uri,
              )
              .then(set => {
                // console.log('');
                console.log('res-After:', set.path);
                // setimageuri(set.path);
                data.push(set.path);
                setContentType(type);
                setFiletype(type);
              })
              .catch(error => {
                console.log('Error in FsInfoResult:', error);
              });
            setimageuri(data);
          });
        })
        .catch(error => {
          console.log('Error in Document Picker:', error);
        });
    }

    // using image Picker

    // launchImageLibrary(options, response => {
    //   // console.log('Response = ', response);

    //   if (response.didCancel) {
    //     // alert('User cancelled camera picker');
    //     return;
    //   } else if (response.errorCode == 'camera_unavailable') {
    //     // alert('Camera not available on device');
    //     return;
    //   } else if (response.errorCode == 'permission') {
    //     // alert('Permission not satisfied');
    //     return;
    //   } else if (response.errorCode == 'others') {
    //     // alert(response.errorMessage);
    //     return;
    //   }
    //   console.log('base64 -> ', response.base64);
    //   console.log('uri -> ', response.uri);
    //   console.log('width -> ', response.width);
    //   console.log('height -> ', response.height);
    //   console.log('fileSize -> ', response.fileSize);
    //   console.log('type -> ', response.type);
    //   console.log('fileName -> ', response.fileName);

    //   if (options.mediaType == 'video') {
    //     console.log('Responce=', response);

    //     // RNFstatData(response?.assets[0]?.uri);
    //     forEach((itm, inx) => {
    //     RNFB.fs
    //     .stat(
    //     '//com.android.providers.media.documents/document/video%3A38',
    //     response?.assets[0]?.uri,
    //     )
    //     .then(set => {
    //       // console.log('');
    //       console.log('response=', set);
    //       setimageuri(set.path);
    //     })
    //     .catch(error => {
    //       console.log('Error in FsInfoResult:', error);
    //     });
    //     });

    //     setContentType('video');
    //     setFiletype('video');

    //     createThumbnail({url: response?.assets[0]?.uri, timeStamp: 10000})
    //       .then(res => {
    //         // setimageuri(res.path);
    //         // setVideouri(response?.assets[0]?.uri);
    //       })
    //       .catch(err => {
    //         console.log('Error in Creating Thubnail:', err);
    //       });
    //   } else {
    //     console.log('Response=', response.assets);
    //     setContentType(type);
    //     setimageuri(response?.assets[0]?.uri);
    //     setFiletype(type);
    //   }
    // });
  };

  async function logoutHandler() {
    setIslogout(true);
    await auth().signOut();
    setIslogout(false);
    navigation.navigate('login');
  }

  function onAuthStateChanged(user) {
    // console.log('User:', user);
    setName(user?._user?.displayName);
  }

  async function uploadImageHandler(item) {
    // console.log('item:', item);
    // setuploading(true);
    const uploaduri = item;
    setTransferCount(0);
    // add timestamp to Filename
    let fileName = uploaduri.substring(uploaduri.lastIndexOf('/') + 1);
    const extension = fileName.split('.').pop();
    const NameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
    fileName = NameWithoutExtension + Date.now() + '.' + extension;

    const StorageRef = storage().ref(`Data/${fileName}`);
    const task = StorageRef.putFile(uploaduri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferCount(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      const url = await StorageRef.getDownloadURL();

      // Alert.alert('Successfully Uploaded the image');
      console.log('Successfully Uploaded the image/video');

      //uploading url to fireStore
      firestore()
        .collection('root')
        .add({
          imgPath: url,
          filetype: filetype,
        })
        // .then(() => {
        //   Alert.alert('Image/Video Added', 'Successfully!');
        // })
        .catch(error => {
          console.log('Error in storing img-Address:', error);
        });
    } catch (err) {
      console.log('Error in Uploading:', err);
      // setuploading(false);
    }

    // console.log('Submitbutton Pressed');
    // setimgResData(
    //   'https://w7.pngwing.com/pngs/169/93/png-transparent-jpg-filetype-icon-thumbnail.png',
    // );
    // setimageuri(
    //   'https://w7.pngwing.com/pngs/169/93/png-transparent-jpg-filetype-icon-thumbnail.png',
    // );

    // setuploading(false);
    // setContentType('photo');
    return null;
  }

  function submitHandler() {
    console.log('imageUri in SubmitButton Handler [item]:', imageuri);
    try {
      if (
        imageuri ==
        'https://w7.pngwing.com/pngs/169/93/png-transparent-jpg-filetype-icon-thumbnail.png'
      ) {
        Alert.alert('Please Select Image/Video First!');
      } else {
        // let counter = 0;
        setuploading(true);
        imageuri.forEach(async (item, index) => {
          // uploadImageHandler(item);

          const resp = await uploadImageHandler(item);
          if (index == imageuri.length - 1) {
            setuploading(false);

            setimgResData(
              'https://w7.pngwing.com/pngs/169/93/png-transparent-jpg-filetype-icon-thumbnail.png',
            );
            setimageuri(
              'https://w7.pngwing.com/pngs/169/93/png-transparent-jpg-filetype-icon-thumbnail.png',
            );
            setContentType('photo');
            Alert.alert('Image/Video Added', 'Successfully!');
          }
        });
      }
    } catch (error) {
      console.log('Error in Submit Handler:', error);
      setuploading(false);
    }
  }
  // return (
  //   <SafeAreaView style={{flex: 1}}>
  //     <ScrollView>
  //       <View
  //         style={{
  //           flex: 1,
  //           padding: scale(20),
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}>
  //         <View
  //           style={{
  //             height: scale(200),
  //             width: '100%',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             backgroundColor: '#ccc',
  //             overflow: 'hidden',
  //           }}>
  //           {contenttype == 'video' && (
  //             <VideoPlayer
  //               onError={err => console.log('error in VideoPlayer:',err)}
  //               controls
  //               source={{
  //                 uri: videouri,
  //               }}
  //               defaultMuted={true}
  //               paused
  //               disableBack
  //               style={{
  //                 height: '100%',
  //                 width: '100%',
  //               }}
  //             />
  //           )}

  //           {contenttype == 'photo' && (
  //             <Image
  //               source={{
  //                 uri: imgRepData,
  //               }}
  //               style={{
  //                 width: 200,
  //                 height: 200,
  //                 margin: 5,
  //                 backgroundColor: '#ccc',
  //               }}
  //             />
  //           )}
  //         </View>
  //         <Button
  //           onpress={() => {
  //             captureImage('photo');
  //           }}>
  //           Launch Camera for Image
  //         </Button>
  //         <Button onpress={() => captureImage('video')}>
  //           Launch Camera for Video
  //         </Button>
  //         <View
  //           style={{
  //             width: '100%',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             flexDirection: 'row',
  //           }}>
  //           <Button onpress={() => chooseFile('photo', 2)}>Choose Image</Button>
  //           <Button onpress={() => chooseFile('video', 2)}>Choose Video</Button>
  //         </View>
  //         <Button
  //           onpress={() => {
  //             navigation.navigate('listscreen');
  //           }}>
  //           View All Images / Videos
  //         </Button>
  //       </View>

  //       <View style={{marginTop: scale(20)}}>
  //         {!uploading ? (
  //           <Button onpress={submitHandler}>Submit Data</Button>
  //         ) : (
  //           <Button>
  //             <Text
  //               style={{
  //                 justifyContent: 'center',
  //                 textAlign: 'center',
  //                 alignItems: 'center',
  //               }}>
  //               {transferCount} % Completed{`\n`}
  //             </Text>
  //             <ActivityIndicator size={'small'} color={'white'} />
  //           </Button>
  //         )}
  //       </View>

  //       {islogout ? (
  //         <View style={{justifyContent: 'flex-end'}}>
  //           <Button>
  //             <ActivityIndicator size={'small'} color={'white'} />
  //           </Button>
  //         </View>
  //       ) : (
  //         <View style={{justifyContent: 'flex-end'}}>
  //           <Button onpress={logoutHandler}>Logout</Button>
  //         </View>
  //       )}
  //     </ScrollView>
  //   </SafeAreaView>
  // );
  return <GroundBooking />;
}
