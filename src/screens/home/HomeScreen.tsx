import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {endLoading, startLoading} from '../../redux/action/SpinnerAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar, Text} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import {getAllCatalogImages, getCatalogDetails} from '../../services/api';
import {
  saveCatalogDetails,
  saveCatalogImages,
} from '../../redux/action/ProductActions';
import homeStyles from './Styles';
import Spinner from '../../components/spinner/Spinner';
import HeaderBar from '../../components/headerBar/HeaderBar';
import ModalLayout from './ItemDetailsModall';
import catalogDetailsStyles from '../catalogDetails/Styles';
import MainStyles from '../../constant/MainStyles';
import FastImage from 'react-native-fast-image';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {catalogImages, catalogDetails} = useSelector(
    state => state.ProductReducer,
  );
  const {width, height} = useWindowDimensions();
  const isPortrait = height > width;
  const IMAGE_SIZE = isPortrait ? 120 : 110; // Adjust image size based on orientation
  const SPACING = 10;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [catId, setCatId] = useState('');
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = catalogImages.filter(item =>
        item.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredImages(filtered);
    } else {
      setFilteredImages(catalogImages);
    }
  }, [searchQuery, catalogImages]);

  useEffect(() => {
    getCatalogImages();

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

  const handleSyncPress = async () => {
    dispatch(startLoading());
    await getCatalogImages();
    dispatch(endLoading());
  };

  const getCatalogImages = async () => {
    dispatch(startLoading());
    setIsLoadingImages(true);
    const networkState = await NetInfo.fetch();
    try {
      if (networkState.isConnected) {
        getAllCatalogImages()
          .then(res => {
            console.log('Catalog Images Data:', res.data);
            dispatch(saveCatalogImages(res.data));
            setIsLoadingImages(false);
          })
          .catch(err => {
            console.log(err);
            setIsLoadingImages(false);
          });
        dispatch(endLoading());
      } else {
        dispatch(endLoading());
        setIsLoadingImages(false);
        Alert.alert('No internet connection, and no cached data available.');
      }
    } catch (error) {
      dispatch(endLoading());
      setIsLoadingImages(false);
      Alert.alert('Something went wrong... Try again later');
    }
  };

  const topRef = useRef();
  const thumbRef = useRef();

  const scrollToActiveIndex = index => {
    if (index === activeIndex) return;

    setActiveIndex(index);

    // Scroll the top image list to the selected index
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    // Scroll the thumbnail list to position the selected item in the middle of the screen
    const maxThumbnailOffset =
      (catalogImages.length - 1) * (IMAGE_SIZE + SPACING) -
      width +
      IMAGE_SIZE +
      SPACING;

    const centerOffset =
      index * (IMAGE_SIZE + SPACING + SPACING) - width / 2 + IMAGE_SIZE / 2;
    const validScrollPosition = Math.min(Math.max(centerOffset, 0));

    thumbRef?.current?.scrollToOffset({
      offset: validScrollPosition,
      animated: true,
    });
  };

  const fetchCatalogDetails = async catalog_id => {
    dispatch(startLoading());
    const networkState = await NetInfo.fetch();
    if (networkState.isConnected) {
      try {
        const data = new FormData();
        data.append('catalogcategoryid', catalog_id);
        const res = await getCatalogDetails(data);
        dispatch(saveCatalogDetails(res.data));
      } catch (err) {
        console.error('Error fetching catalog details:', err);
      } finally {
        dispatch(endLoading());
      }
    } else {
      dispatch(endLoading());
      Alert.alert('No internet connection, and no cached data available.');
    }
  };

  const handleViewDetails = async item => {
    await fetchCatalogDetails(item.catalog_id);
    setModalVisible(true);
  };

  const itemDetailsModal = () => {
    return (
      <ModalLayout
        visible={modalVisible}
        setVisible={setModalVisible}
        onPress={() => setModalVisible(false)}>
        {catalogDetails &&
        catalogDetails.product_details &&
        catalogDetails.product_details.length > 0 ? (
          <View>
            {catalogDetails.product_details.map((item, index) => (
              <View key={index} style={catalogDetailsStyles.card}>
                <Text style={catalogDetailsStyles.productName}>
                  {item.name}
                </Text>
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
                  <View
                    style={{
                      width: '73%',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: MainStyles.COLORS.BLACK,
                      }}>
                      :{' '}
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
                  <View
                    style={{
                      width: '73%',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: MainStyles.COLORS.BLACK,
                      }}>
                      :{' '}
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
            ))}
          </View>
        ) : (
          <View style={{padding: 20}}>
            <Text style={homeStyles.noRequests2}>
              No product details available
            </Text>
          </View>
        )}
      </ModalLayout>
    );
  };

  const renderCatalogImage = useCallback(
    ({item}) => {
      return (
        <View style={[homeStyles.imageContainer, {width, height}]}>
          <FastImage
            source={{uri: `https://aws.erav.lk/everast/${item.path}`}}
            style={[
              homeStyles.image2,
              isPortrait ? {marginTop: '-15%'} : {marginTop: 0},
            ]}
            resizeMode={FastImage.resizeMode.contain}
          />

          <TouchableOpacity
            style={homeStyles.detailButton}
            onPress={() => {
              handleViewDetails(item);
              setCatId(item.catalog_id);
            }}>
            <Text style={homeStyles.detailButtonText}>View Details</Text>
          </TouchableOpacity>
          <View style={homeStyles.categoryWrapper}>
            <Text style={homeStyles.categoryText}>{item.category}</Text>
          </View>
        </View>
      );
    },
    [handleViewDetails, isPortrait, width, height],
  );

  const renderThumbnail = useCallback(
    ({item, index}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (index !== activeIndex) {
              scrollToActiveIndex(index);
              setSelectedItem(item);
            }
          }}>
          <FastImage
            source={{uri: `https://aws.erav.lk/everast/${item.path}`}}
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              borderRadius: 12,
              marginRight: SPACING,
              borderWidth: 2,
              borderColor: activeIndex === index ? '#FF4500' : '#EEEEEE',
              marginLeft: SPACING,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      );
    },
    [activeIndex, scrollToActiveIndex],
  );

  return (
    <SafeAreaView style={homeStyles.container}>
      <HeaderBar
        isMenu={true}
        page="ENOMAX"
        isHome={true}
        onSync={handleSyncPress}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Spinner />

      {modalVisible && itemDetailsModal()}

      <>
        <Searchbar
          style={{
            marginLeft: 40,
            marginRight: 40,
            marginTop: 10,
            borderRadius: 15,
            color: 'black',
          }}
          placeholder="Search By Category Name...."
          placeholderTextColor={MainStyles.COLORS.DARK_GREY}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />

        <FlatList
          ref={topRef}
          data={filteredImages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderCatalogImage}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={ev => {
            scrollToActiveIndex(
              Math.floor(ev.nativeEvent.contentOffset.x / width),
            );
          }}
          initialNumToRender={100}
          maxToRenderPerBatch={100}
          windowSize={100}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />

        <FlatList
          ref={thumbRef}
          data={filteredImages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderThumbnail}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{position: 'absolute', bottom: 10}}
          contentContainerStyle={{paddingHorizontal: SPACING}}
          initialNumToRender={100}
          maxToRenderPerBatch={100}
          windowSize={100}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: IMAGE_SIZE + SPACING,
            offset: (IMAGE_SIZE + SPACING) * index,
            index,
          })}
        />
      </>
    </SafeAreaView>
  );
};

export default HomeScreen;
