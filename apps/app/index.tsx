import 'react-native-gesture-handler'
import { Assets } from '@react-navigation/elements'
import { registerRootComponent } from 'expo'
import { Asset } from 'expo-asset'
import App from './screen/app'
//
import { OneSignal } from 'react-native-onesignal'
OneSignal.initialize('65eb2508-a403-4157-b52f-528a39caf8e4')

Asset.loadAsync(Assets)
registerRootComponent(App)
