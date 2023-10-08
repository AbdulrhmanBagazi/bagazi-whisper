import { useAuthHook } from '../hook/auth'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const MAppleButton: React.FC<{ text: string; dark: boolean }> = ({
  text
  // dark
}) => {
  const Navigation = useNavigation()
  const { loading } = useAuthHook((state) => state)

  return (
    <Button
      mode="contained"
      icon="apple"
      // buttonColor={dark ? '#FFFFFF' : '#000'}
      // textColor={dark ? 'black' : 'white'}
      buttonColor={'#FFFFFF'}
      textColor={'black'}
      style={{
        // width: windowWidth / 2,
        justifyContent: 'center'
      }}
      onPress={() => {
        Navigation.navigate('Auth', {
          screen: 'AppleLoading'
        })
      }}
      disabled={loading}
    >
      {text}
    </Button>
  )
}

export default MAppleButton
