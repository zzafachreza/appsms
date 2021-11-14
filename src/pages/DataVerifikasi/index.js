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
export default function DataVerifikasi({navigation, route}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataList();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getDataList();
  }, []);

  const getDataList = () => {
    // setRefreshing(true);
    axios.get('https://zavalabs.com/sininja/api/verifikasi.php').then(res => {
      setData(res.data);
      console.log(res.data);
      // setRefreshing(false);
    });
  };

  const ListDataTindak = ({label, value, warna = colors.black}) => {
    return (
      <View
        style={{
          // paddingHorizontal: 10,
          paddingVertical: 5,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#CDCDCD',
        }}>
        <Text
          style={{
            flex: 1,
            fontFamily: fonts.secondary[600],
            color: warna,
            fontSize: windowWidth / 30,
          }}>
          {label}
        </Text>
        <Text
          style={{
            flex: 2,
            fontFamily: fonts.secondary[400],
            color: warna,
            fontSize: windowWidth / 30,
          }}>
          {value}
        </Text>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DataVerifikasiInput', item)}
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
            fontSize: windowWidth / 25,
            color: colors.primary,
            fontFamily: fonts.secondary[600],
            // textAlign: 'right',
          }}>
          Ruas : {item.ruas}
        </Text>
        <View style={{flexDirection: 'column'}}>
          <ListDataTindak label="Tanggal" value={item.tanggal} />
          <ListDataTindak label="Kerusakan" value={item.kategori} />
          <ListDataTindak label="Jenis" value={item.jenis} />
          <ListDataTindak
            label="Lokasi"
            value={` ${item.awal} sd ${item.akhir} ${item.jalur} ${item.lajur}`}
          />
          <ListDataTindak label="Hari ini" value={item.today} />
          <ListDataTindak label="Batas Waktu" value={`5 Hari`} />
          <ListDataTindak label="Sampai" value={item.tanggal_batas} />

          {item.lebih > 0 && (
            <ListDataTindak
              warna="red"
              label="Terlambat"
              value={`${item.lebih} Hari`}
            />
          )}
          <View
            style={{
              backgroundColor:
                item.status == 'SELESAI' ? colors.success : colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                color: colors.white,
                fontSize: windowWidth / 30,
              }}>
              {item.status}
            </Text>
          </View>
        </View>
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
          VERIFIKASI INSPEKSI IKJ
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
