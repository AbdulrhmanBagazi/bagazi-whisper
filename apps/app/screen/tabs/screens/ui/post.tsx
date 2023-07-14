import { Text, useTheme } from 'react-native-paper'
import { RefreshControl, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useI18nHook } from '../../../../hook/i18n'
import { usePostQuery } from '../../../../graphql/generated'

const ProfilePost = () => {
  const theme = useTheme()
  const I18n = useI18nHook((state) => state.I18n)
  const { loading, error, data, refetch } = usePostQuery()

  return (
    <FlashList
      data={data?.Get_Post}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor={theme.colors.onBackground}
          onRefresh={() => refetch()}
        />
      }
      ListEmptyComponent={() =>
        !loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 100
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
              {I18n.Profile.FirstPost}
            </Text>
          </View>
        ) : null
      }
      renderItem={({ item }) =>
        error ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 100
            }}
          >
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={100}
              color={theme.colors.surfaceDisabled}
            />
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.surfaceDisabled }}
            >
              {I18n.Errors.Unknown}
            </Text>
          </View>
        ) : (
          <Text>
            {item.body}
            {item._count?.likes}
          </Text>
        )
      }
      estimatedItemSize={200}
    />
  )
}

export default ProfilePost
