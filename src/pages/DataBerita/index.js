import React from 'react';
import {StyleSheet, Dimensions, Text, View, Modal, Image} from 'react-native';

import ImageZoom from 'react-native-image-pan-zoom';
import {windowWidth} from '../../utils/fonts';

export default function DataBerita({route}) {
  const item = route.params;

  return (
    <View>
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={200}
        imageHeight={200}>
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: 250,
            aspectRatio: 1,
            resizeMode: 'contain',
          }}
          source={{uri: item.foto}}
        />
      </ImageZoom>
    </View>
  );
}

const styles = StyleSheet.create({});
