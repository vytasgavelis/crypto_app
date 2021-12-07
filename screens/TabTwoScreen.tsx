import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import SwitchSelector from 'react-native-switch-selector';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const filters = ['BTC', 'ETH', 'DOGE'];

  const getPrices = async (filter?: string) => {
    try {
      let url = 'https://cryptopanic.com/api/v1/posts/?auth_token=de35011fd54a7bd5df7a0e82851966812754f826';

      if (filter && filters.includes(filter)) {
        url += `&currencies=${filter}`;
      }

      const response = await fetch(url);
      const json = await response.json();

      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function resolveDateDiff(date: string): string {
    let time = Date.parse(date);

    const currentTime = new Date().getTime();

    const msDelta = currentTime - time;
    const minutesDelta = Math.round(msDelta / 1000 / 60);

    if (minutesDelta > 60) {
      return Math.round(minutesDelta / 60) + ' h'
    } else {
      return minutesDelta + ' m';
    }
  }

  React.useEffect(() => {
    getPrices();
  }, []);

  const options = [
    { label: "", value: "1", id: "switch-one", imageIcon: require('../assets/images/list.png') },
    { label: "BTC", value: "BTC", id: "switch-one-thirty",  imageIcon: require('../assets/images/btc.png') },
    { label: "ETH", value: "ETH", id: "switch-two",  imageIcon: require('../assets/images/eth.png') },
    { label: "DOGE", value: "DOGE", id: "switch-two",  imageIcon: require('../assets/images/doge.png') }
  ];

  return (
    <View style={styles.container}>
      <SwitchSelector
        options={options}
        initial={0}
        hasPadding
        textColor={'black'}
        selectedColor={'white'}
        buttonColor={'black'}
        borderColor={'black'}
        onPress={value => getPrices(value)}
      ></SwitchSelector>
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <FlatList
          data={data.results}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
              style={styles.priceItem}
              key={item.name}
              onPress={() => navigation.navigate('ArticleModal', { 'articleUrl': item.url })}
            >
              <View style={styles.listRow}>
                <Text style={{ fontSize: 15, marginRight: 5 }}>{resolveDateDiff(item.created_at)}</Text>
                <Text style={{ fontSize: 15 }} numberOfLines={4} >{item.title}</Text>
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
    padding: 10
  },
  priceItem: {
    borderColor: '#ebe7dd',
    //borderColor: 'white',
    borderWidth: 3.5,
    borderRadius: 8,
    margin: 5,
    paddingRight: 30
  }
});