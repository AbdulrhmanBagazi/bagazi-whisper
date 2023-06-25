import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/home'
import ProfileScreen from './screens/profile'
//typs
import { TabsStackParamList } from '../../types/types'
import { IconButton } from 'react-native-paper'
import { useThemeHook } from '../../hook/theme'

const Tab = createBottomTabNavigator<TabsStackParamList>()

export default function TabsStack() {
  const ToggleTheme = useThemeHook((state) => state.ToggleTheme)
  const Dark = useThemeHook((state) => state.Dark)

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon="theme-light-dark"
              onPress={() => ToggleTheme(Dark)}
            />
          )
          // headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}
