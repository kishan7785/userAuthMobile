import React, {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
// import ActionSheet from 'react-native-action-sheet-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {normalizeText} from '../responsive-text';
export default function KImagePicker({
  asVisible,
  onVisibleChange,
  onFilePathSelect,
  selectionLimit = 1,
}) {
  const bannerOptions = [
    {name: 'Camera', value: 'Camera', extraData: {type: 'camera'}},
    {
      name: 'Photo Library',
      value: 'Photo Library',
      extraData: {type: 'gallery'},
    },
  ];

  function onChange(value, extraData) {
    //console.log('Val', value);
    onVisibleChange(!asVisible);
    setTimeout(() => {
      if (value == 'Camera') {
        console.log('Camera');
        captureImage('photo');
      } else {
        console.log('Gallery');
        chooseFile('photo');
      }
    }, 600);
  }

  const captureImage = async type => {
    let options = {
      mediaType: type,
      quality: 1,

    };
    let isCameraPermitted = await requestCameraPermission();

    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        // onFilePathSelect(response);
        if (response?.assets) {
          onFilePathSelect(response?.assets[0]);
        } else {
          onFilePathSelect(response);
        }
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      quality: 1,
      selectionLimit: selectionLimit,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      const asset = response.assets[0];
      console.log('base64 -> ', asset);
      console.log('uri -> ', asset.uri);
      console.log('width -> ', asset.width);
      console.log('height -> ', asset.height);
      console.log('fileSize -> ', asset.fileSize);
      console.log('type -> ', asset.type);
      console.log('fileName -> ', asset.fileName);
      if (selectionLimit > 1) {
        onFilePathSelect(response.assets);
      } else {
        onFilePathSelect(asset);
      }
    });
  };

  // Permission
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
    return (
      <ActionSheet
        options={bannerOptions}
        isVisible={asVisible}
        onClose={() => {
          onVisibleChange(!asVisible);
        }}
        onChange={onChange}
        hideCancel={false}
        cancelText="Cancel"
        cancelTextStyle={{fontSize: normalizeText(13)}}
        cancelContainerStyle={{backgroundColor: 'white'}}
        optionsTextStyle={{fontSize: normalizeText(13)}}
        optionsContainerStyle={{backgroundColor: 'white'}}
        modalProps={{
          animationInTiming: 500,
        }}
      />
    );
}
