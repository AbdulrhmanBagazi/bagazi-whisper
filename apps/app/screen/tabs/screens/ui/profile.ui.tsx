import { Avatar, Chip, IconButton, Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const ProfileUI = () => {
  const theme = useTheme()
  const Navigation = useNavigation()

  return (
    <FlashList
      data={[]}
      ListHeaderComponent={() => (
        <View style={{ flex: 1, padding: 5 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Avatar.Text size={100} label="XD" />
            <Text variant="headlineLarge" style={{ writingDirection: 'ltr' }}>
              @Username
            </Text>
            <IconButton
              icon="cog"
              onPress={() => Navigation.navigate('Settings')}
              style={{
                position: 'absolute',
                top: 0,
                right: 0
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-around'
            }}
          >
            <Chip icon="account-plus" onPress={() => console.log('Pressed')}>
              Friends: 25
            </Chip>
            <Chip icon="note" mode="outlined">
              Posts: 200
            </Chip>
            <Chip icon="heart" mode="outlined">
              Likes: 10k
            </Chip>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <MaterialCommunityIcons
            name="note-off"
            size={100}
            color={theme.colors.surfaceDisabled}
          />
          <Text
            variant="labelLarge"
            style={{ color: theme.colors.surfaceDisabled }}
          >
            Create your first post
          </Text>
        </View>
      )}
      renderItem={({ item }) => <Text>{item}</Text>}
      estimatedItemSize={200}
    />
  )
}

export default ProfileUI
