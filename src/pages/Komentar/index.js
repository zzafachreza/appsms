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
import {MyButton, MyInput} from '../../components';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({navigation, route}) {
  const hh = route.params;
  console.log('kriima', hh);
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const [kirim, setKirim] = useState({
    id_survey: hh.id,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataBarang();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getDataBarang();
    getData('user').then(res => {
      setKirim({...kirim, id_member: res.id});
    });
  }, []);

  const getDataBarang = () => {
    axios
      .post('https://zavalabs.com/sms/api/komentar.php', {
        id: hh.id,
      })
      .then(res => {
        setData(res.data);
        console.log('ambil', res);
      });
  };

  const kirimData = () => {
    axios
      .post('https://zavalabs.com/sms/api/komentar_add.php', kirim)
      .then(res => {
        getDataBarang();
      });
  };

  const renderItem = ({item}) => (
    <View
      //   onPress={() => navigation.navigate('Pinjam', item)}
      style={{
        paddingVertical: 10,
        marginBottom: 2,
        backgroundColor: 'white',
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderRadius: 25,
            margin: 5,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Image
            source={{
              uri:
                item.foto == ''
                  ? 'https://zavalabs.com/nogambar.jpg'
                  : item.foto,
            }}
            resizeMode="cover"
            style={{width: 50, height: 50}}
          />
        </View>
        <View style={{flex: 1, paddingLeft: 10}}>
          <Text
            style={{
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[600],
            }}>
            {item.nama_lengkap}
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 35,
              color: colors.border,
              fontFamily: fonts.secondary[400],
            }}>
            {item.tanggal} {item.jam}
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            {item.komentar}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
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
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>

      <View style={{padding: 10}}>
        <MyInput
          onChangeText={val =>
            setKirim({
              ...kirim,
              komentar: val,
            })
          }
          placeholder="masukan komentar"
          onSubmitEditing={kirimData}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
