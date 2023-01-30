import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
//imports screen/component

import slides from './slides';
import OnBoardingItem from './onboardingitem';
import Paginator from './paginator';
import {normalizeText} from '../../responsive-text';
import {scale} from 'react-native-size-matters';
import slides2 from './slides2';
import NextButton from './nextbutton';
import {newUser} from '../../redux toolkit/countreducer';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnBoardingScreen({navigation}) {
  const [currentIndex, setCurrentindex] = useState(0);
  const [iniRoute, setIniRoute] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;

  

  const dispatch = useDispatch();
  // console.log('scrollX:',scrollX);

  const viewableItemChanges = useRef(viewableItem => {
    // console.log('viewableitem:', viewableItem?.viewableItems[0]?.index);
    setCurrentindex(viewableItem?.viewableItems[0]?.index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < slides2.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate('login');
      // dispatch(newUser(false));
      AsyncStorage.setItem('isFirstTimeOpen','true')
    }
  };

  const slidesRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={slides2}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <OnBoardingItem item={item} />;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          onViewableItemsChanged={viewableItemChanges}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={{flex: 1}}>
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / slides2.length)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: scale(20),
  },
});

// Using React native onboarding swiper

// export default function OnBoardingScreen({navigation}) {
//   return (
//     <Onboarding
//       pages={slides}
//       onSkip={() => {
//         navigation.navigate('login');
//       }}
//       DoneButtonComponent={() => {
//         return (
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               padding: scale(16),
//             }}>
//             <Pressable
//               onPress={() => {
//                 console.log('Done');
//                 navigation.navigate('login')
//               }}>
//               <Text style={{color: 'black', fontSize: normalizeText(14)}}>
//                 Done
//               </Text>
//             </Pressable>
//           </View>
//         );
//       }}
//     />
//   );
// }
