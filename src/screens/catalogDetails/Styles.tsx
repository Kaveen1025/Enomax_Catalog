import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const catalogDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainStyles.COLORS.WHITE,
  },

  noImageContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noImageText: {
    marginTop: verticalScale(25),
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '700',
    color: MainStyles.COLORS.RED,
  },

  productList: {
    width: '100%',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 25,
    elevation: 5,
  },
  productName: {
    fontSize: 25,
    fontWeight: '600',
    color: MainStyles.COLORS.DARK_BLUE,
  },
  productPrice: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
  },
  productQty: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },

  detailLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    width: 100,
  },
});

export default catalogDetailsStyles;
