import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements';

export default function MyButton({
  title,
  fontSize = 18,
  warna,
  onPress,
  Icons,
  left = 5,
  radius = 10,
  bottom,
  colorText = 'white',
  fontWeight = 'normal',
  iconColor = 'white',
  borderSize = 0,
  borderColor = 'red',
}) {
  return (
    <TouchableOpacity
      style={styles(warna, radius, borderSize, borderColor, bottom).btn}
      onPress={onPress}>
      <Icon type="ionicon" name={Icons} color={iconColor} size={18} />
      <Text
        style={{
          color: colorText,
          fontSize: fontSize,
          left: left,
          fontFamily: fonts.primary[600],
          // fontWeight: fontWeight,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = (warna, radius, borderSize, borderColor, bottom) =>
  StyleSheet.create({
    btn: {
      marginBottom: bottom,
      height: 50,
      borderRadius: radius,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: warna,
      borderWidth: borderSize,
      borderColor: borderColor,
      flexDirection: 'row',
    },
  });
