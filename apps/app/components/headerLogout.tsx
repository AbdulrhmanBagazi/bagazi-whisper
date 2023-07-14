import { Appbar, IconButton } from 'react-native-paper'
import { useAuthHook } from '../hook/auth'
import { useSnckHook } from '../hook/snack'
import { useI18nHook } from '../hook/i18n'
import { Alert } from 'react-native'

const HeaderLogout: React.FC = () => {
  const loading = useAuthHook((state) => state.loading)
  const SignOut = useAuthHook((state) => state.SignOut)
  const ShowSnack = useSnckHook((state) => state.ShowSnack)
  const I18n = useI18nHook((state) => state.I18n)

  const HandleSignOut = async () => {
    const Response = await SignOut()

    if (Response === 'error') {
      return ShowSnack(I18n.Errors.Unknown)
    }

    if (Response === 'success') {
      return ShowSnack(I18n.Snack.SignOut)
    }
  }

  return (
    <Appbar.Header style={{ justifyContent: 'flex-end' }}>
      <IconButton
        icon="logout"
        onPress={() =>
          Alert.alert(I18n.Settings.SignOut, I18n.Alert['Alert.SignOut'], [
            {
              text: I18n.Alert.No,
              style: 'cancel'
            },
            {
              text: I18n.Alert.Yes,
              onPress: () => HandleSignOut()
            }
          ])
        }
        disabled={loading}
      />
    </Appbar.Header>
  )
}

export default HeaderLogout
