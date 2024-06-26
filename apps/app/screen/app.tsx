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
import UsernameScreen from './username/username'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import PostScreen from './post/post'
import FriendsStack from './friends/stack'
import PrivacyScreen from './auth/screens/privacy'
import TermsScreen from './auth/screens/terms'

const RootStack = createNativeStackNavigator<RootStackParamList>()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const { Dark, ThemeStore } = useThemeHook((state) => state)
  const { I18nStore } = useI18nHook((state) => state)
  const { AuthLoading, auth, username } = useAuthHook((state) => state)
  const { HideSnack, show, text } = useSnckHook((state) => state)
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
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: Dark
          ? CombinedDarkTheme.colors.background
          : CombinedDefaultTheme.colors.background
      }}
    >
      <SafeAreaView
        style={{
          flexGrow: 1,
          backgroundColor: Dark
            ? CombinedDarkTheme.colors.background
            : CombinedDefaultTheme.colors.background
        }}
      >
        <ThemeProvider value={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
          <PaperProvider
            theme={Dark ? CombinedDarkTheme : CombinedDefaultTheme}
          >
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
                        name="TermsScreen"
                        component={TermsScreen}
                        options={{
                          title: ' '
                        }}
                      />
                      <RootStack.Screen
                        name="PrivacyScreen"
                        component={PrivacyScreen}
                        options={{
                          title: ' '
                        }}
                      />
                      <RootStack.Screen
                        name="Friends"
                        component={FriendsStack}
                        options={{
                          headerShown: false,
                          gestureDirection: 'vertical',
                          gestureEnabled: !AuthLoading
                        }}
                      />
                      <RootStack.Screen
                        name="Post"
                        component={PostScreen}
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
                duration={1500}
                style={{ marginHorizontal: 20 }}
                wrapperStyle={{
                  bottom: 60
                }}
              >
                {text}
              </Snackbar>
            </ApolloProvider>
          </PaperProvider>
        </ThemeProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
