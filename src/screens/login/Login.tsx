import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import loginStyles from './Styles';
import {useNavigation} from '@react-navigation/native';
import {Root_URL} from '../../constant/APIURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {endLoading, startLoading} from '../../redux/action/SpinnerAction';
import {useDispatch} from 'react-redux';
// import {loginFunction} from '../../service/api';
import MainStyles from '../../constant/MainStyles';

const Login = () => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const userLogin = () => {
    navigation.navigate('HomeScreen' as never);
  };
  //   const userLogin = () => {
  //     dispatch(startLoading());
  //     var data = new FormData();
  //     data.append('username', username);
  //     data.append('password', password);
  //     data.append('logintype', value); // Dropdown value sent as 'logintype'

  //     loginFunction(data)
  //       .then(async res => {
  //         dispatch(endLoading());
  //         if (res.data.code == '200') {
  //           // Save user data to AsyncStorage only if login is successful
  //           try {
  //             await AsyncStorage.setItem('user', res.data.refid);
  //             await AsyncStorage.setItem('empid', res.data.empid);
  //             await AsyncStorage.setItem('userType', value); // Save dropdown value here

  //             // Reset fields after login success
  //             setUsername('');
  //             setPassword('');
  //             setValue('');
  //             navigation.navigate('DrowerNavigation' as never);
  //           } catch (error) {
  //             console.error('Error saving to AsyncStorage', error);
  //           }
  //         } else {
  //           Alert.alert(
  //             'Login Failed',
  //             'Username or Password Incorrect/ Please make sure to select your correct designation',
  //           );
  //         }
  //       })
  //       .catch(error => {
  //         console.log('error', error);
  //         dispatch(endLoading());
  //         Alert.alert('Login Failed', 'Something Went Wrong...');
  //       });
  //   };
  return (
    <SafeAreaView style={loginStyles.container}>
      <ScrollView>
        <View style={loginStyles.logoView}>
          <View>
            <View style={loginStyles.logoCircle}>
              <Image
                source={require('../../assets/images/Ehpl.png')}
                style={loginStyles.image}></Image>
            </View>
            <Text style={loginStyles.welcomeTxt}>Welcome Back!</Text>
            <Text style={loginStyles.welcomeTxt2}></Text>
          </View>
        </View>

        <View style={loginStyles.welcomeView}>
          <Text style={loginStyles.loginTxt}>Login to your account</Text>

          <View style={loginStyles.inputStyle}>
            <View style={loginStyles.sectionStyle}>
              <Image
                source={require('../../assets/images/user.png')}
                style={loginStyles.imageStyle}
              />
              <TextInput
                style={loginStyles.txtInput}
                placeholder="Enter Username"
                underlineColorAndroid="transparent"
                placeholderTextColor="#A9A9A9"
                defaultValue={username}
                onChange={e => setUsername(e.nativeEvent.text)}
              />
            </View>

            <View style={loginStyles.sectionStyle}>
              <Image
                source={require('../../assets/images/password.png')}
                style={loginStyles.imageStyle}
              />
              <TextInput
                style={loginStyles.txtInput}
                placeholder="Enter Password"
                placeholderTextColor="#A9A9A9"
                underlineColorAndroid="transparent"
                secureTextEntry={isSecureEntry ? true : false}
                defaultValue={password}
                onChange={e => setPassword(e.nativeEvent.text)}
              />

              <Pressable onPress={() => setIsSecureEntry(!isSecureEntry)}>
                <Image
                  source={
                    isSecureEntry
                      ? require('../../assets/images/invisible.png')
                      : require('../../assets/images/eye.png')
                  }
                  style={loginStyles.imageIcon}></Image>
              </Pressable>
            </View>
          </View>
          <View style={loginStyles.buttonView}>
            <TouchableOpacity
              style={loginStyles.button}
              onPress={() => userLogin()}>
              <Text style={loginStyles.text}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={loginStyles.createAccount}
            onPress={() => navigation.navigate('SignUp' as never)}>
            <Text style={loginStyles.account}>
              Don't have an account?{' '}
              <Text style={loginStyles.signup}>Sign Up</Text>
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <View style={loginStyles.abstractBottom} />
    </SafeAreaView>
  );
};

export default Login;
