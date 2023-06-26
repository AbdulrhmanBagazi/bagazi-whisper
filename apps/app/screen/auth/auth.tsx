import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from './screens/signin'
//types
import { AuthStackParamList } from '../../types/types'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
