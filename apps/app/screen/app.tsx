import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider, Snackbar } from 'react-native-paper'
import { ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaView } from 'react-native'
import { useThemeHook } from '../hook/theme'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme/config'
import Client from '../config/api/apollo'
import { RootStackParamList } from '../types/types'
import { useCallback, useEffect, useState } from 'react'
//Screens
import TabsStack from './tabs/tabs'
import AuthStack from './auth/auth'
import SettingsScreen from './settings/settings'
import LoadingScreen from './loading/loading'
import { useI18nHook } from '../hook/i18n'
import { useSnckHook } from '../hook/snack'
import { useAuthHook } from '../hook/auth'
import FriendsScreen from './friends/friends'
import UsernameScreen from './username/username'

const RootStack = createNativeStackNavigator<RootStackParamList>()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const Dark = useThemeHook((state) => state.Dark)
  const ThemeStore = useThemeHook((state) => state.ThemeStore)
  const I18nStore = useI18nHook((state) => state.I18nStore)
  const AuthLoading = useAuthHook((state) => state.AuthLoading)
  const auth = useAuthHook((state) => state.auth)
  const username = useAuthHook((state) => state.username)
  const HideSnack = useSnckHook((state) => state.HideSnack)
  const show = useSnckHook((state) => state.show)
  const text = useSnckHook((state) => state.text)

  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        ThemeStore()
        I18nStore()
      } catch (e) {
        setAppIsReady(true)
      } finally {
        setTimeout(() => {
          setAppIsReady(true)
        }, 1000)
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
    <SafeAreaView
      style={{
        flexGrow: 1,
        backgroundColor: Dark
          ? CombinedDarkTheme.colors.background
          : CombinedDefaultTheme.colors.background
      }}
    >
      <ThemeProvider value={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <PaperProvider theme={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
          <ApolloProvider client={Client}>
            <StatusBar style={Dark ? 'light' : 'dark'} animated />
            <NavigationContainer
              theme={Dark ? CombinedDarkTheme : CombinedDefaultTheme}
              onReady={onLayoutRootView}
            >
              <RootStack.Navigator>
                {AuthLoading ? (
                  <RootStack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={{ headerShown: false }}
                  />
                ) : auth && username === null ? (
                  <RootStack.Screen
                    name="Username"
                    component={UsernameScreen}
                    options={{
                      headerShown: false
                    }}
                  />
                ) : auth ? (
                  <>
                    <RootStack.Screen
                      name="Tabs"
                      component={TabsStack}
                      options={{ headerShown: false, animation: 'fade' }}
                    />
                    <RootStack.Screen
                      name="Settings"
                      component={SettingsScreen}
                      options={{
                        headerShown: false,
                        gestureDirection: 'vertical',
                        gestureEnabled: !AuthLoading
                      }}
                    />
                    <RootStack.Screen
                      name="Friends"
                      component={FriendsScreen}
                      options={{
                        headerShown: false,
                        gestureDirection: 'vertical',
                        gestureEnabled: !AuthLoading
                      }}
                    />
                  </>
                ) : (
                  <RootStack.Screen
                    name="Auth"
                    component={AuthStack}
                    options={{
                      headerShown: false
                      // gestureDirection: 'vertical'
                    }}
                  />
                )}
              </RootStack.Navigator>
            </NavigationContainer>
            <Snackbar
              visible={show}
              onDismiss={() => HideSnack()}
              duration={2500}
            >
              {text}
            </Snackbar>
          </ApolloProvider>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaView>
  )
}
