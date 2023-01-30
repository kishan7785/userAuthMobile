import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ImgList from '../../../../components/imagelist';
import {scale} from 'react-native-size-matters';

// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from 'react-native-video-player';
export default function ListData() {
  const [fetching, setFetching] = useState(false);
  const [urls, seturls] = useState([]);
  const [file, setfile] = useState();
  const [visiblity, setvisiblity] = useState(false);
  const [VideiType, setvideoType] = useState(false);
  const [imageType, setImageType] = useState(false);

  useEffect(() => {
    FetchData();
  }, []);
  async function FetchData() {
    const data = [];
    setFetching(true);
    await firestore()
      .collection('root')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          data.push(documentSnapshot._data);
        });
      });
    setFetching(false);
    seturls(data);

    // console.log('urls:', urls);
    // console.log('urls:', urls.length);
  }
  function renderItem({item, index}) {
    const {imgPath = '', filetype = ''} = item;
    if (filetype == 'photo') {
      return (
        <Pressable
          onPress={() => {
            console.log('imagePath:', imgPath);
            console.log('Filetype:', filetype);
            setfile(imgPath, filetype);
            setvisiblity(true);
            setImageType(true);
          }}>
          <View
            style={{
              height: scale(115),
              width: scale(115),
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: imgPath}}
              style={{
                height: scale(115),
                width: scale(115),
                borderRadius: scale(1),
                borderColor: 'white',
                borderWidth: 1,
              }}
            />
          </View>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={() => {
            console.log('videoUri:', imgPath);
            console.log('FileType:', filetype);
            setvideoType(true);

            setfile(imgPath);
            setvisiblity(true);
          }}>
          <View
            style={{
              height: scale(115),
              width: scale(115),
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              borderRadius: scale(1),
              borderColor: 'white',
              borderWidth: 1,
            }}>
            <VideoPlayer
              control={false}
              video={{
                uri: imgPath,
              }}
              defaultMuted={true}
              disableBack
              videoStyle={{
                height: scale(115),
                width: scale(115),
                borderRadius: scale(1),
                borderColor: 'white',
                borderWidth: 1,
              }}
              paused={false}
              tapAnywhereToPause={true}
              toggleResizeModeOnFullscreen={false}
              controlAnimationTiming={200}
              controlTimeout={250000}
            />
          </View>
        </Pressable>
      );
    }
  }

  return (
    <View style={{flex: 1, paddingHorizontal: scale(2)}}>
      {fetching ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      ) : (
        <View>
          <FlatList
            data={urls}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItem}
            numColumns={3}
          />

          <Modal
            animationType={'fade'}
            transparent={false}
            visible={visiblity}
            onRequestClose={() => {
              setvisiblity(false);
              setImageType(false);
              setvideoType(false);
            }}>
            <View
              style={{
                height: '90%',
                alignItems: 'center',
                backgroundColor: '#ff323223',
                justifyContent: 'center',
                padding: 10,
                borderRadius: 50,
                margin: 20,
              }}>
              {VideiType ? (
                <VideoPlayer
                  control={false}
              
                  video={{
                    uri: file,
                  }}
                  defaultMuted={true}
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  paused={false}
                  tapAnywhereToPause={true}
                  toggleResizeModeOnFullscreen={false}
                  controlAnimationTiming={200}
                  controlTimeout={250000}
                />
              ) : (
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={{uri: file}}
                />
              )}
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}
