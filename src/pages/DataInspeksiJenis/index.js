import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {windowWidth, fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({navigation, route}) {
  const jenis = route.params.jenis;
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([
    {
      nama: 'Lubang, diameter < 10 cm, kedalaman < 4 cm',
      jenis: jenis,
    },
    {
      nama: 'Lubang, diameter > 10 cm, kedalaman > 4 cm',
      jenis: jenis,
    },
    {
      nama: 'Retak, lebar > 3 mm, luas 5% setiap 100 m',
      jenis: jenis,
    },
    {
      nama: 'Amblas, lebar > 3 cm, luas 5% setiap 100 m',
      jenis: jenis,
    },
    {
      nama: 'Ketidakrataan perkerasan (overlay), IRI < 4 mm/m',
      jenis: jenis,
    },
    {
      nama: 'Rutting/Alur, kedalaman > 25 mm',
      jenis: jenis,
    },
    {
      nama: 'Raveling',
      jenis: jenis,
    },
    {
      nama: 'Patching yang tidak rata',
      jenis: jenis,
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getDataBarang();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    // getDataBarang();
  }, []);

  //   const getDataBarang = () => {
  //     axios.get('https://zavalabs.com/ekpp/api/jadwal.php').then(res => {
  //       setData(res.data);
  //     });
  //   };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DataInspeksiInput', item)}
      style={{
        padding: 10,
        marginVertical: 10,
        borderBottomWidth: 3,
        elevation: 2,
        borderBottomColor: colors.secondary,
        backgroundColor: 'white',

        // height: 80,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.black,
            fontFamily: fonts.secondary[400],
          }}>
          {item.nama}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // flex: 1,
        }}>
        <Icon type="ionicon" name="warning" color={colors.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      style={{
        padding: 10,
      }}>
      <View style={{padding: 10, backgroundColor: colors.secondary}}>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.black,
            textAlign: 'center',
            fontFamily: fonts.secondary[600],
          }}>
          {jenis}
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
