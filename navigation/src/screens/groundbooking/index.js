import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {normalizeText} from '../../../../responsive-text';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FetIcon from 'react-native-vector-icons/Feather';
import {GlobalStyles} from '../../../../constants/constColors';
import CustButton from '../../../../constants/gradiantbutton';
import {Shadow} from 'react-native-shadow-2';

const GroundBooking = () => {
  const deviceheight = useWindowDimensions().height;
  return (
    // <ScrollView style={{flex:1}}>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        borderRadius: 5,
        padding: scale(16),
        overflow: 'scroll',
      }}>
      <View style={{flex: 2,}}>
        <View
          style={{
            // flex:1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            // width: '100%',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              // width: 50,
              //  paddingHorizontal: scale(20)
              // backgroundColor:'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntIcon
              name="arrowleft"
              size={normalizeText(20)}
              color={'black'}
            />
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'black',
                fontSize: (deviceheight>1000)?normalizeText(15):normalizeText(20),
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Booking Ground
            </Text>
          </View>
        </View>
        <Shadow
          distance={scale(10)}
          startColor={GlobalStyles.colors.lightCyan}
          // endColor={GlobalStyles.colors.TextColor}
          offset={[scale(1), scale(14)]}>
          <View
            style={{
              height: scale(150),
              width: scale(300),
              // backgroundColor: GlobalStyles.colors.mainCyan,
              justifyContent: 'center',
              borderRadius: scale(10),
              marginVertical: scale(10),
              overflow: 'hidden',
              elevation: 5,
            }}>
            <Image
              source={{uri: 'https://wallpaperaccess.com/full/3468823.jpg'}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </Shadow>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '95%',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: GlobalStyles.colors.TextColor,
                fontSize: (deviceheight>1000)?normalizeText(12):normalizeText(15),
                fontWeight: 'bold',
                padding: scale(4),
                borderRadius: scale(4),
                justifyContent: 'flex-start',
              }}>
              MVR Cricket Ground
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                color: 'black',
                backgroundColor: 'yellow',
                paddingVertical: scale(2),
                paddingHorizontal: scale(20),
                borderRadius: scale(4),
                textAlign: 'center',
                fontSize: (deviceheight>1000)?normalizeText(9):normalizeText(12),
              }}>
              <FetIcon
                name="map-pin"
                size={(deviceheight>1000)?normalizeText(8):normalizeText(10)}
                color={'black'}
              />{' '}
              Chennai
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            // marginTop: scale(70),
            alignItems: 'center',
            width: '90%',
            flexDirection: 'row',
            backgroundColor: GlobalStyles.colors.lightCyan,
            borderRadius: scale(4),
          }}>
          <View
            style={{
              width: '75%',
              paddingHorizontal: scale(10),
              height: (deviceheight>1000)?scale(30):scale(40),
              // alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              style={{
                backgroundColor: GlobalStyles.colors.lightCyan,
                // textAlign: 'center',
                fontSize: (deviceheight>1000)?normalizeText(8):normalizeText(12),
              }}
              placeholder="Enter Your PromoCode"
              placeholderTextColor={'gray'}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              // backgroundColor:'red'
            }}>
            <AntIcon
              name="arrowright"
              size={(deviceheight>1000)?normalizeText(15):normalizeText(18)}
              color={'gray'}
            />
          </View>
        </View>
        <View style={{}}>
          <Text
            style={{
              marginVertical: scale(10),
              fontSize: (deviceheight>1000)?normalizeText(10):normalizeText(15),
              color: 'black',
              fontWeight: 'bold',
            }}>
            Booking Info
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize:(deviceheight>1000)?normalizeText(13):normalizeText(16), fontWeight: '500'}}>
              4 Items
            </Text>
            <Text
              style={{
                fontSize: (deviceheight>1000)?normalizeText(13):normalizeText(16),
                color: GlobalStyles.colors.darkGray,
                fontWeight: '600',
              }}>
              Rs.2,999.00
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              fontWeight: '600',
            }}>
            <Text style={{fontSize:(deviceheight>1000)?normalizeText(13):normalizeText(16), fontWeight: '500'}}>
              Shipping free
            </Text>
            <Text
              style={{
                fontSize: (deviceheight>1000)?normalizeText(13):normalizeText(16),
                color: GlobalStyles.colors.darkGray,
                fontWeight: '600',
              }}>
              Rs.60.00
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              fontWeight: '600',
            }}>
            <Text style={{fontSize: (deviceheight>1000)?normalizeText(13):normalizeText(16), fontWeight: '500'}}>
              Total
            </Text>
            <Text
              style={{
                fontSize: (deviceheight>1000)?normalizeText(13):normalizeText(16),
                color: GlobalStyles.colors.darkGray,
                fontWeight: '600',
              }}>
              Rs.3,057.00
            </Text>
          </View>
        </View>
        <CustButton>Checkout</CustButton>
      </View>
      {/* <View
        style={{
          position: 'absolute',
          margin: scale(20),
          backgroundColor: 'red',
          alignItems:'baseline'
          // marginLeft: 150,
        }}>
        <AntIcon name="arrowleft" size={normalizeText(20)} color={'black'} />
      </View> */}
    </View>
    // </ScrollView>
  );
};

export default GroundBooking;
