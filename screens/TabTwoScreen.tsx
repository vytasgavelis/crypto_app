import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    borderWidth: 5,
    borderColor: 'yellow',
    borderRadius: 50
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingRight: 30,
    paddingBottom: 50
  },
  separator: {
    marginVertical: 40,
    //height: 1,
    width: '80%',
    color: 'blue'
  },
});
