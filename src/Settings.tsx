import Colors from '@constants/colors';
import CommonStyles from '@constants/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Settings(): JSX.Element {
  const [savedIp, setSavedIp] = React.useState<string>('');
  const [savedPort, setSavedPort] = React.useState<string>('');

  const handleApplyHost = async () => {};

  return (
    <View style={styles.container}>
      <View style={CommonStyles.flexRow.alignCenter}>
        {/* <TextInput
          value={ip}
          style={styles.input}
          onChangeText={text => setIp(text)}
        />
        <View style={{ width: 8 }} />
        <TextInput
          value={port}
          style={styles.input}
          onChangeText={text => setPort(text)}
        /> */}
        <View style={{ width: 8 }} />
        <TouchableOpacity style={styles.enterBtn} onPress={handleApplyHost}>
          <Text style={{ color: 'white' }}>Enter</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 32 }} />
      <Text>Saved IP: {savedIp}</Text>
      <Text>Saved Port: {savedPort}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.flexCol.center,
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  input: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#00000050',
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  enterBtn: {
    paddingHorizontal: 16,
    backgroundColor: 'black',
    paddingVertical: 8,
    borderRadius: 8,
  },
});
