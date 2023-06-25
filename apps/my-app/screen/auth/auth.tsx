import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from './screens/signin'
import SignUpScreen from './screens/signup'
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
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
