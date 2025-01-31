import {Dimensions, StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainStyles.COLORS.WHITE,
  },

  gridView: {
    marginTop: 10,
    flex: 1,
  },

  modalBackgroundStyle: {
    backgroundColor: 'white',
  },

  itemContainer: {
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: MainStyles.COLORS.WHITE,
    borderColor: MainStyles.COLORS.DARK_BLUE,
    padding: 10,
    height: 300,
  },

  shadowProp: {
    elevation: 5,
    shadowColor: '#52006A',
  },

  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },

  itemName: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
    color: MainStyles.COLORS.DARK_BLUE,
    fontWeight: 'bold',
  },

  imageStyle: {
    width: horizontalScale(120),
    height: verticalScale(120),
    resizeMode: 'contain',
  },

  imageView: {
    alignItems: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
    marginTop: 20,
    width: horizontalScale(120),
    height: verticalScale(120),
    marginBottom: 15,
  },

  title: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
    marginTop: 25,
    fontWeight: 'bold',
    color: MainStyles.COLORS.DARK_BLUE,
  },

  noRequests: {
    marginTop: verticalScale(25),
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: MainStyles.COLORS.RED,
  },

  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  image2: {
    width: '100%',
    height: '100%',
  },

  detailButton: {
    position: 'absolute',
    top: 8,
    backgroundColor: '#009E60',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    width: 250,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  noRequests2: {
    marginTop: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: MainStyles.COLORS.RED,
  },

  categoryWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    top: 85,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  categoryText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF', // White color for better contrast
  },
});

export default homeStyles;
