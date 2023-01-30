import {Pressable, StyleSheet, View, Text, Dimensions} from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import {normalizeText} from '../responsive-text';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalStyles} from './constColors';
function CustButton({name, size, color, children, onpress}) {
  return (
    <View style={{marginHorizontal: scale(0), marginVertical: scale(30)}}>
      <Pressable
        onPress={onpress}
        style={({pressed}) => pressed && styles.pressed}>
        <LinearGradient
          colors={[GlobalStyles.colors.TextColor,GlobalStyles.colors.DarkCyan, ]}
          style={styles.button}>
          <MatIcon name={name} size={size} color={color} />
          <Text style={styles.buttonText}>{children}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}
export default CustButton;
const DeviceHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: scale(8),
    padding: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(90),
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: normalizeText(12),
  },

  pressed: {
    opacity: 0.25,
    backgroundColor: 'white',
    borderRadius: scale(4),
  },
});
