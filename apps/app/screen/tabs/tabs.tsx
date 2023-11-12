import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/home'
import ProfileScreen from './screens/profile'
import { TabsStackParamList } from '../../types/types'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Tab = createBottomTabNavigator<TabsStackParamList>()

export default function TabsStack() {
  const Navigation = useNavigation()

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: React.ComponentProps<
              typeof MaterialCommunityIcons
            >['name']

            if (route.name === 'Home') {
              iconName = focused ? 'gamepad-circle' : 'gamepad-circle-outline'
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account-circle' : 'account-circle-outline'
            } else {
              iconName = 'help'
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
          },
          tabBarShowLabel: false
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false
          }}
        />
      </Tab.Navigator>
      <FAB
        icon="plus"
        style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: 5
        }}
        size="small"
        onPress={() => Navigation.navigate('Post')}
      />
    </>
  )
}
