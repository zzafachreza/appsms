import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts, windowWidth, windowHeight} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton, MyGap, MyInput} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

export default function ListData({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([
    {
      id: 1,
    },
  ]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        console.log(res);

        axios
          .post('https://zavalabs.com/sms/api/survey.php', {
            id_member: res.id,
          })
          .then(res => {
            setKet('');
            console.log(res.data);
            setData(res.data);
          });
      });
    }
  }, [isFocused]);

  const MyList = ({lab, val}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#CDCDCD',
          paddingVertical: 3,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 35,
              color: colors.black,
            }}>
            {lab}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 35,
              color: colors.black,
            }}>
            {val}
          </Text>
        </View>
      </View>
    );
  };

  const [ket, setKet] = useState('');

  const filterData = () => {
    // alert(ket);
    axios
      .post('https://zavalabs.com/sms/api/survey.php', {
        key: ket,
      })
      .then(res => {
        console.log('filter', res.data);
        setData(res.data);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 10,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
          borderBottomColor: colors.primary,
          borderBottomWidth: 1,
        }}>
        <TextInput
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 20,
            flex: 1,
          }}
          value={ket}
          onChangeText={val => setKet(val)}
          placeholder="masukan kata kunci"
          onSubmitEditing={filterData}
        />
        <TouchableOpacity onPress={filterData}>
          <Icon type="ionicon" name="search" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>
        {data.map(item => {
          return (
            <View
              key={item.id}
              style={{
                margin: 5,
                elevation: 2,
                backgroundColor: colors.white,
              }}>
              <View
                onPress={() => {
                  // console.log('cek detail', item);
                  // navigation.navigate('ListDetail', item);
                }}>
                <View style={{flex: 1, padding: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[600],
                          fontSize: windowWidth / 25,
                          color: colors.black,
                        }}>
                        {item.tim}
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[400],
                          fontSize: windowWidth / 35,
                          color: colors.black,
                        }}>
                        {item.tanggal}
                      </Text>
                    </View>
                  </View>

                  <MyGap jarak={10} />

                  <MyList lab="Kecamatan" val={item.kecamatan} />
                  <MyList lab="Desa/Kelurahan" val={item.kelurahan} />
                  <MyList lab="Jalan/Gang" val={item.jalan} />
                  <MyList
                    lab="Panjang Jalan"
                    val={item.jalan_panjang + ' Meter'}
                  />
                  <MyList lab="Lebar Jalan" val={item.jalan_lebar + ' Meter'} />
                  <MyList
                    lab="Panjang Drainase"
                    val={item.drainase_panjang + ' Meter'}
                  />
                  <MyList
                    lab="Lebar Drainase"
                    val={item.drainase_lebar + ' Meter'}
                  />
                </View>
                {/* slider */}
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  pagingEnabled={true}>
                  {item.jml1 > 36 && (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate('DataBerita', {
                          foto: item.foto1,
                        })
                      }
                      style={{
                        backgroundColor: 'red',
                        margin: 0,
                        borderRadius: 5,
                        overflow: 'hidden',
                      }}>
                      <FastImage
                        style={{width: windowWidth - 20, height: 250}}
                        source={{
                          uri: item.foto1,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableWithoutFeedback>
                  )}

                  {item.jml2 > 36 && (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate('DataBerita', {
                          foto: item.foto2,
                        })
                      }
                      style={{margin: 10, borderRadius: 5, overflow: 'hidden'}}>
                      <FastImage
                        style={{width: windowWidth - 30, height: 250}}
                        source={{
                          uri: item.foto2,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableWithoutFeedback>
                  )}

                  {item.jml3 > 36 && (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate('DataBerita', {
                          foto: item.foto3,
                        })
                      }
                      style={{margin: 10, borderRadius: 5, overflow: 'hidden'}}>
                      <FastImage
                        style={{width: windowWidth - 50, height: 250}}
                        source={{
                          uri: item.foto3,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableWithoutFeedback>
                  )}

                  {item.jml4 > 36 && (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate('DataBerita', {
                          foto: item.foto4,
                        })
                      }
                      style={{margin: 10, borderRadius: 5, overflow: 'hidden'}}>
                      <FastImage
                        style={{width: windowWidth - 50, height: 250}}
                        source={{
                          uri: item.foto4,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableWithoutFeedback>
                  )}

                  {item.jml5 > 36 && (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate('DataBerita', {
                          foto: item.foto5,
                        })
                      }
                      style={{margin: 10, borderRadius: 5, overflow: 'hidden'}}>
                      <FastImage
                        style={{width: windowWidth - 50, height: 250}}
                        source={{
                          uri: item.foto5,
                          headers: {Authorization: 'someAuthToken'},
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableWithoutFeedback>
                  )}
                </ScrollView>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Komentar', item)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      margin: 10,
                      // backgroundColor: 'red',
                      paddingRight: 20,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        type="ionicon"
                        size={15}
                        color={colors.black}
                        name="chatbox-outline"
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[400],
                          fontSize: windowWidth / 30,
                          left: 5,
                          color: colors.black,
                        }}>
                        Komentar
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
