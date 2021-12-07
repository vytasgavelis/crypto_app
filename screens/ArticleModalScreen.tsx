import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ArticleModalScreen({ route, navigation }) {
    const { articleUrl } = route.params;

    return (
        <WebView source={{ uri: articleUrl }}></WebView>
    );
}