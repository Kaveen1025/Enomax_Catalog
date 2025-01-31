import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  LogBox,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';

import Spinner from '../../components/spinner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {endLoading, startLoading} from '../../redux/action/SpinnerAction';
import {SafeAreaView} from 'react-native-safe-area-context';

import HeaderBar from '../../components/headerBar/HeaderBar';

import NetInfo from '@react-native-community/netinfo';
import {getCatalogDetails} from '../../services/api';
import {saveCatalogDetails} from '../../redux/action/ProductActions';
import {
  CustomNavigationType,
  productRouteDataType,
  reduxStateType,
} from '../../utils/type';

import catalogDetailsStyles from './Styles';
// import {ImageSlider} from 'react-native-image-slider-banner';
import {FlatList} from 'react-native-gesture-handler';
import MainStyles from '../../constant/MainStyles';

const CatelogDetailsScreen = () => {
  const navigation = useNavigation<CustomNavigationType>();
  const route = useRoute<productRouteDataType>();
  const {hardwareItem, cName} = route.params;
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const {catalogDetails} = useSelector(
    (state: reduxStateType) => state?.ProductReducer,
  );

  useEffect(() => {
    dispatch(startLoading());
    const fetchData = async () => {
      await getCatelogDetails();
      dispatch(endLoading());
    };
    fetchData();
  }, []);

  const getCatelogDetails = async () => {
    const networkState = await NetInfo.fetch();
    if (networkState.isConnected) {
      dispatch(startLoading());
      var data = new FormData();
      data.append('catalogcategoryid', hardwareItem);
      try {
        const res = await getCatalogDetails(data);
        dispatch(saveCatalogDetails(res.data));
        const imagePaths = res.data.product_images.map(image => ({
          img: `https://aws.erav.lk/everast/${image.imagepath}`,
        }));
        setImages(imagePaths);
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(endLoading());
      }
    } else {
      dispatch(endLoading());
      Alert.alert('No internet connection, and no cached data available.');
    }
  };

  const renderItem = ({item}) => (
    <View style={catalogDetailsStyles.card}>
      <Text style={catalogDetailsStyles.productName}>{item.name}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
            width: 100,
          }}>
          Price (Rs.)
        </Text>
        <View style={{width: '73%', flexDirection: 'row', flexWrap: 'nowrap'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: MainStyles.COLORS.BLACK,
            }}>
            :
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: MainStyles.COLORS.BLACK,
              marginLeft: 5,
              flexShrink: 1,
            }}>
            {parseFloat(item.price)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginTop: 15,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
            width: 100,
          }}>
          Quantity
        </Text>
        <View style={{width: '73%', flexDirection: 'row', flexWrap: 'nowrap'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: MainStyles.COLORS.BLACK,
            }}>
            :
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: MainStyles.COLORS.BLACK,
              marginLeft: 5,
              flexShrink: 1,
            }}>
            {item.qty}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={catalogDetailsStyles.container}>
      <HeaderBar
        isMenu={false}
        page={cName}
        isHome={false}
        onPress={() => navigation.navigate('HomeScreen' as never)}
      />

      <Spinner />
      {/* <View style={{height: '45%', marginTop: -10}}>
        {images?.length > 0 ? (
          <ImageSlider
            data={images}
            autoPlay={true}
            preview={false}
            caroselImageStyle={{resizeMode: 'cover', height: '100%'}}
            caroselImageContainerStyle={{height: '100%'}}
            // onItemChanged={item => console.log('item', item)}
            closeIconColor="#fff"
          />
        ) : (
          <View style={catalogDetailsStyles.noImageContainer}>
            <Text style={catalogDetailsStyles.noImageText}>
              No Images Available
            </Text>
          </View>
        )}
      </View> */}
      <View style={{maxHeight: '50%'}}>
        {catalogDetails?.product_details?.length > 0 ? (
          <FlatList
            data={catalogDetails.product_details}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={catalogDetailsStyles.productList}
          />
        ) : (
          <View style={catalogDetailsStyles.noImageContainer}>
            <Text style={catalogDetailsStyles.noImageText}>
              Products Not Available
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CatelogDetailsScreen;
