import {Pressable, StyleSheet, View, Text, Dimensions} from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {scale} from 'react-native-size-matters';
import {normalizeText} from '../responsive-text';
function Button({name, size, color, children, onpress}) {
  return (
    <View style={{marginHorizontal: scale(20), marginVertical: scale(5)}}>
      <Pressable
        onPress={onpress}
        style={({pressed}) => pressed && styles.pressed}>
        <View style={styles.button}>
          <MatIcon name={name} size={size} color={color} />
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}
export default Button;
const DeviceHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: scale(4),
    padding: scale(12),
    backgroundColor: 'purple',
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
