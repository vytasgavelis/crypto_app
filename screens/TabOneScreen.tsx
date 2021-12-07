import * as React from 'react';
import { FlatList, ListViewBase, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { SvgUri } from 'react-native-svg';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const getPrices = async () => {
    try {
      const response = await fetch('https://api.nomics.com/v1/currencies/ticker?key=9ffa89fcb1139a548df4745aaaa7d3723c08cbdb&ids=BTC,ETH,XRP,DOGE,DOT,ADA,USDT,LTC&interval=1d,30d');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getPrices();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <FlatList
          style={styles.subContainer}
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
              style={styles.priceItem}
              key={item.name}
              onPress={() => navigation.navigate('Modal', { 'assetName': item.name, 'assetId': item.id })}
            >
              <View style={styles.listRow}>
                <SvgUri uri={item.logo_url} style={{ marginRight: 5 }} width="20" height="20" />
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                <Text style={{ fontSize: 20, marginLeft: 'auto' }}>$ {(Math.round(item.price * 100) / 100).toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20
  },
  subContainer: {
    width: 300,
    // height: 500,
  },
  priceItem: {
    borderColor: '#ebe7dd',
    //borderColor: 'white',
    borderWidth: 3.5,
    borderRadius: 8,
    margin: 5
  }
});
