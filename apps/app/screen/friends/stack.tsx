import { FriendsStackParamList } from '../../types/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FriendsScreen from './friends'
import SeachScreen from './search'

const Stack = createNativeStackNavigator<FriendsStackParamList>()

export default function FriendsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Friend"
        component={FriendsScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Search"
        component={SeachScreen}
        options={{
          headerShown: false,
          gestureDirection: 'vertical'
        }}
      />
    </Stack.Navigator>
  )
}
