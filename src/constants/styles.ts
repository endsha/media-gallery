import { StyleSheet } from 'react-native';

const CommonStyles = {
  flexCol: StyleSheet.create({
    default: {
      flexDirection: 'column',
    },
    alignCenter: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    alignEnd: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    alignBetween: {
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    justifyCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    center: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    justifyBetween: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    justifyBetweenCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    justifyEndCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  }),
  flexRow: StyleSheet.create({
    default: {
      flexDirection: 'row',
    },
    alignStart: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    alignCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    justifyCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    justifyEnd: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    justifyEndCenter: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    center: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    justifyBetweenCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    justifyBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    justifyAroundCenter: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    wrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  }),
  // The format for typo name is `${textType}${fontWeight}${fontFamily}${fontSize}`
  typo: StyleSheet.create({
    text700NotoSansKR22: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '700',
      fontSize: 22,
      lineHeight: 28,
    },
    text600NotoSansKR22: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '600',
      fontSize: 22,
      lineHeight: 30,
    },
    text600NotoSansKR16: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 22,
    },
    text600NotoSansKR14: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 20,
    },
    text600NotoSansKR18: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 26,
    },
    text700NotoSansKR18: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '700',
      fontSize: 18,
      lineHeight: 27,
    },
    text400NotoSansKR16: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 22,
    },
    text700NotoSansKR16: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 22,
    },
    text400NotoSansKR14: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 18,
    },
    text400NotoSansKR12: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
    },
    text500NotoSansKR12: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 16,
    },
    text500NotoSansKR14: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 18,
    },
    text500NotoSansKR16: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 22,
    },
    text500NotoSansKR48: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '500',
      fontSize: 48,
      lineHeight: 66,
    },
    text700NotoSansKR14: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 18,
    },
    text600NotoSansKR12: {
      // fontFamily: 'NotoSansKR',
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 18,
    },
  }),
};

export default CommonStyles;
