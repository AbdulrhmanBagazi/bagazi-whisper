import { Text, useTheme } from 'react-native-paper'
import { View, ActivityIndicator, RefreshControlProps } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useI18nHook } from '../../../../hook/i18n'
import { FeedPosts } from '../../../../graphql/generated'
import FeedCard from '../../../../components/feed/feedCard'
import { windowHeight } from '../../../../config/config'

const Feed: React.FC<{
  refreshControl:
    | React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
      >
    | undefined
  onEndReached: () => void
  loading: boolean
  feed: FeedPosts[]
  end: boolean
}> = ({ refreshControl, onEndReached, loading, feed, end }) => {
  const theme = useTheme()
  const { I18n } = useI18nHook((state) => state)

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      data={feed}
      onEndReached={onEndReached}
      refreshControl={refreshControl}
      scrollsToTop={false}
      ListFooterComponent={
        <View
          style={{
            padding: 25,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {loading ? (
            <ActivityIndicator animating={loading} />
          ) : end ? (
            <Text style={{ color: theme.colors.surfaceDisabled }}>
              {I18n.Post.End}
            </Text>
          ) : null}
        </View>
      }
      ListEmptyComponent={() => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: windowHeight / 3
          }}
        >
          <MaterialCommunityIcons
            name="note-off"
            size={100}
            color={theme.colors.surfaceDisabled}
          />
        </View>
      )}
      renderItem={({ item }) => <FeedCard data={item} />}
      estimatedItemSize={100}
    />
  )
}

export default Feed
