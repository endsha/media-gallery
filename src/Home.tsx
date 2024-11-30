import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import ListPost from '@components/ListPost';

export default function Home(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ListPost />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
