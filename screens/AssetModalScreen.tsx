import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ActivityIndicator, FlatList, Linking, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

export default function AssetModalScreen({ route, navigation }) {

  const { assetName, assetId } = route.params;


  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const regex = /<[^>]*>/ig;

  const getAsset = async () => {
    try {
      const response = await fetch(`https://data.messari.io/api/v1/assets/${assetId}/profile`);
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getAsset();
  }, []);


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={isLoading}></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      <View style={styles.separator} lightColor="" darkColor="white" />
      <Text style={styles.description}>{(String(data.overview)).replaceAll(regex, "")}</Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View style={styles.separator} lightColor="" darkColor="white" />
      <FlatList
        data={data.relevant_resources}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.url} onPress={() => Linking.openURL(item.url)}>
            <Text style={{ color: 'white', textDecorationLine: 'underline' }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  description: {
    // paddingLeft: 20,
    // paddingRight: 20,
    fontSize: 18,
    width: '80%',
  },
  url: {
    // margin: 20
  }
});
