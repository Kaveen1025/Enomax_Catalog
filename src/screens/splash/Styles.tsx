import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: MainStyles.COLORS.WHITE,
  },

  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  hrmsTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: MainStyles.COLORS.CHILI_PAPER,
    fontStyle: 'italic',
  },

  poweredBy: {
    color: MainStyles.COLORS.CHILI_PAPER,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  poweredByView: {
    position: 'absolute',
    bottom: verticalScale(4),
    alignSelf: 'center',
    flexDirection: 'row',
  },

  logo: {
    width: 60,
    height: 60,
    marginLeft: horizontalScale(2),
    resizeMode: 'contain',
  },
});

export default splashStyles;
