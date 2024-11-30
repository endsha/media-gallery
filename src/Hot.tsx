import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import ListPost from '@components/ListPost';

import Colors from '@constants/colors';

export default function Hot(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ListPost isHot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
