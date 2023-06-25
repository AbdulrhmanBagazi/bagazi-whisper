import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'
import { ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import * as SplashScreen from 'expo-splash-screen'
//
import { useThemeHook } from '../hook/theme'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme/config'
import Client from '../config/api/apollo'
//Screens
import TabsStack from './tabs/tabs'
import AuthStack from './auth/auth'
//types
import { RootStackParamList } from '../types/types'
import { useCallback, useEffect, useState } from 'react'
import LoadingScreen from './loading/loading'

const RootStack = createNativeStackNavigator<RootStackParamList>()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const Dark = useThemeHook((state) => state.Dark)
  const ThemeStore = useThemeHook((state) => state.ThemeStore)
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        ThemeStore()
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <ThemeProvider value={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
      <PaperProvider theme={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <ApolloProvider client={Client}>
          <StatusBar style={Dark ? 'light' : 'dark'} animated />
          <NavigationContainer
            theme={Dark ? CombinedDarkTheme : CombinedDefaultTheme}
            onReady={onLayoutRootView}
          >
            <RootStack.Navigator>
              <RootStack.Screen
                name="Loading"
                component={LoadingScreen}
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                name="Tabs"
                component={TabsStack}
                options={{ headerShown: false }}
              />
              <RootStack.Screen name="Auth" component={AuthStack} />
            </RootStack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </PaperProvider>
    </ThemeProvider>
  )
}
