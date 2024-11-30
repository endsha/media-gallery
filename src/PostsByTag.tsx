import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Colors from '@constants/colors';
import { useRoute } from '@react-navigation/native';
import ListPost from '@components/ListPost';

export default function PostsByTag(): JSX.Element {
  const route = useRoute();
  const { tagId } = route.params as { tagId: string };

  return (
    <SafeAreaView style={styles.container}>
      <ListPost tagId={tagId} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
