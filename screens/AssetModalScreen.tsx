import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
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

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.name}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={styles.description}>{(String(data.overview)).replaceAll(regex, "")}</Text>
            
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    description: {
        paddingLeft: 20,
        paddingRight: 20
    }
});
