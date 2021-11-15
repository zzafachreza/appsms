import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, ListItem, Button} from 'react-native-elements';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {TextInput} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';

export default function MyInput({
  onFocus,
  label,
  iconname,
  onChangeText,
  onSubmitEditing,
  value,
  borderColor = colors.primary,
  keyboardType,
  labelColor = colors.primary,
  secureTextEntry,
  styleInput,
  placeholder,
  backgroundColor = colors.white,
  autoFocus,
  label2,
  styleLabel,
  colorIcon = colors.primary,
}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: labelColor,
            left: 10,
            fontSize: 16,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>
      {label2 && (
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: labelColor,
            left: 10,
            fontSize: 14,
            marginVertical: 1,
            ...styleLabel,
          }}>
          {label2}
        </Text>
      )}
      <TextInput
        autoFocus={autoFocus}
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderRadius: 10,
          borderWidth: 1,
          paddingLeft: 10,
          color: colors.black,
          fontSize: 18,
          fontFamily: fonts.primary[400],
          ...styleInput,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
