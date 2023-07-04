import { Alert, Platform, StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../types/types'
import { useAuthHook } from '../../hook/auth'
import { useThemeHook } from '../../hook/theme'
import { useI18nHook } from '../../hook/i18n'
import { Text, Switch, Divider, RadioButton, Button } from 'react-native-paper'
import Header from '../../components/header'
import { useSnckHook } from '../../hook/snack'
import { ScrollView } from 'react-native-gesture-handler'

export default function SettingsScreen({
  navigation
}: RootStackScreenProps<'Settings'>) {
  const ToggleTheme = useThemeHook((state) => state.ToggleTheme)
  const Dark = useThemeHook((state) => state.Dark)
  const auth = useAuthHook((state) => state.auth)
  const loading = useAuthHook((state) => state.loading)
  const SignOut = useAuthHook((state) => state.SignOut)
  const ToggleI18n = useI18nHook((state) => state.ToggleI18n)
  const I18n = useI18nHook((state) => state.I18n)
  const Language = useI18nHook((state) => state.Language)
  const ShowSnack = useSnckHook((state) => state.ShowSnack)

  const HandleSignOut = async () => {
    const Response = await SignOut()

    if (Response === 'error') {
      ShowSnack(I18n.Errors.Unknown)
    }

    if (Response === 'success') {
      ShowSnack(I18n.Snack.SignOut)

      return navigation.replace('Auth', {
        screen: 'SignIn'
      })
    }
  }

  return (
    <View>
      <Header />
      <ScrollView alwaysBounceVertical={false}>
        <View style={{ flex: 1, padding: 5 }}>
          <Text variant="bodyLarge">{I18n.Settings.Theme}</Text>
          <View style={styles.items}>
            <Text variant="labelLarge">{I18n.Settings.DarkMode}</Text>
            <Switch value={Dark} onValueChange={ToggleTheme} />
          </View>
          <Divider style={styles.Divider} />
          <Text variant="bodyLarge">{I18n.Settings.Notification}</Text>
          <View style={styles.items}>
            <Text variant="labelLarge">{I18n.Settings.AllowNotification}</Text>
            <Switch
            // value={
            //   Notification?.hasNotificationPermission
            //     ? !Notification.isPushDisabled
            //     : false
            // }
            // onValueChange={ToggleNotification}
            // disabled={notificationLoading}
            />
          </View>
          <Divider style={styles.Divider} />
          <Text variant="bodyLarge">{I18n.Settings.Language}</Text>
          <View>
            <RadioButton.Item
              label={I18n.Settings.Arabic}
              value="ar"
              disabled={Language === 'ar'}
              status={Language === 'ar' ? 'checked' : 'unchecked'}
              onPress={() =>
                Platform.OS === 'ios'
                  ? ToggleI18n('ar')
                  : Alert.alert(
                      I18n.Settings.AppRestart,
                      I18n.Settings.Wanttoproceed,
                      [
                        {
                          text: I18n.Alert.Yes,
                          onPress: () => {
                            ToggleI18n('ar')
                          }
                        },
                        {
                          text: I18n.Notifications.Cancel
                        }
                      ]
                    )
              }
            />
          </View>
          <View>
            <RadioButton.Item
              value={I18n.Settings.English}
              label="English"
              disabled={Language === 'en'}
              status={Language === 'en' ? 'checked' : 'unchecked'}
              onPress={() =>
                Platform.OS === 'ios'
                  ? ToggleI18n('en')
                  : Alert.alert(
                      I18n.Settings.AppRestart,
                      I18n.Settings.Wanttoproceed,
                      [
                        {
                          text: I18n.Alert.Yes,
                          onPress: () => {
                            ToggleI18n('en')
                          }
                        },
                        {
                          text: I18n.Notifications.Cancel
                        }
                      ]
                    )
              }
            />
          </View>
          <Divider style={styles.Divider} />
          <View style={styles.signou}>
            <Button
              icon="logout"
              mode="contained"
              onPress={() =>
                Alert.alert(
                  I18n.Settings.SignOut,
                  I18n.Alert['Alert.SignOut'],
                  [
                    {
                      text: I18n.Alert.No,
                      style: 'cancel'
                    },
                    {
                      text: I18n.Alert.Yes,
                      onPress: () => HandleSignOut()
                    }
                  ]
                )
              }
              disabled={loading || !auth}
            >
              {I18n.Settings.SignOut}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  signou: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  Divider: {
    marginVertical: 10
  }
})
