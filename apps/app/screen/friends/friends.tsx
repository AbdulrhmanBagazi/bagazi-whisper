import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Header from '../../components/header'

export default function FriendsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          flex: 1,
          padding: 5,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>FriendsScreen</Text>
      </View>
    </View>
  )
}
