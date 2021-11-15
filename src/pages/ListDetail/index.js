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

export default function ListDetail({navigation}) {
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
          .post('https://zavalabs.com/sms/api/survey2.php', {
            id_member: res.id,
          })
          .then(res => {
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
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'SMS',
                          'Apakah Anda yakin akan hapus transaksi ini ?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                axios
                                  .post(
                                    'https://zavalabs.com/sms/api/survey_hapus.php',
                                    {
                                      id_member: item.id_member,
                                      id_survey: item.id,
                                    },
                                  )
                                  .then(res2 => {
                                    console.log(res2);
                                    axios
                                      .post(
                                        'https://zavalabs.com/sms/api/survey2.php',
                                        {
                                          id_member: item.id_member,
                                        },
                                      )
                                      .then(res => {
                                        console.log(res.data);
                                        setData(res.data);
                                      });
                                  });
                              },
                            },
                          ],
                        );
                      }}>
                      <Icon type="ionicon" color={colors.border} name="trash" />
                    </TouchableOpacity>
                  </View>

                  <MyGap jarak={10} />

                  <MyList lab="Kecamatan" val={item.tanggal} />
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
                <ScrollView horizontal={true}>
                  <View
                    style={{margin: 10, borderRadius: 5, overflow: 'hidden'}}>
                    <Image
                      source={{uri: item.foto1}}
                      style={{width: windowWidth - 50, height: 250}}
                    />
                  </View>
                  <View
                    style={{margin: 10, borderRadius: 5, overflow: 'hidden'}}>
                    <Image
                      source={{uri: item.foto2}}
                      style={{width: windowWidth - 50, height: 250}}
                    />
                  </View>
                  <View
                    style={{margin: 10, borderRadius: 5, overflow: 'hidden'}}>
                    <Image
                      source={{uri: item.foto3}}
                      style={{width: windowWidth - 50, height: 250}}
                    />
                  </View>
                  <View
                    style={{margin: 10, borderRadius: 5, overflow: 'hidden'}}>
                    <Image
                      source={{uri: item.foto4}}
                      style={{width: windowWidth - 50, height: 250}}
                    />
                  </View>
                  <View
                    style={{margin: 10, borderRadius: 5, overflow: 'hidden'}}>
                    <Image
                      source={{uri: item.foto5}}
                      style={{width: windowWidth - 50, height: 250}}
                    />
                  </View>
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
