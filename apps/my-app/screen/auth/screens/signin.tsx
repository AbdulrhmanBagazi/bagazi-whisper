import { View } from 'react-native'
import MGoogleButton from '../../../components/googleButton'

export default function SignInScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MGoogleButton text="" dark={false} />
    </View>
  )
}
