import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import { RefreshControl, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useI18nHook } from '../../../../hook/i18n'
import {
  useGet_More_PostQuery,
  usePostQuery
} from '../../../../graphql/generated'
import PostCard from '../../../../components/postCard'
import { useProfilePostsHook } from '../../../../hook/profileposts'

const ProfilePost = () => {
  const theme = useTheme()
  const I18n = useI18nHook((state) => state.I18n)
  const initialposts = useProfilePostsHook((state) => state.initialposts)
  const loadMorePosts = useProfilePostsHook((state) => state.loadMorePosts)
  const posts = useProfilePostsHook((state) => state.posts)
  const count = useProfilePostsHook((state) => state.count)
  const { loading, error, refetch, data } = usePostQuery({
    onCompleted(data) {
      return initialposts(data)
    }
  })

  const LoadMore = useGet_More_PostQuery({
    variables: {
      cursor: ''
    },
    skip: true,
    onCompleted(data) {
      return loadMorePosts(data)
    }
  })

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      data={posts}
      contentContainerStyle={{ paddingBottom: 50 }}
      onEndReached={() =>
        loading || posts.length === count
          ? null
          : LoadMore.refetch({
              cursor: posts[posts.length - 1].id
            })
      }
      ListFooterComponent={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
          }}
        >
          {loading ? null : LoadMore.loading ? (
            <ActivityIndicator />
          ) : posts.length === count ? (
            <Text style={{ color: theme.colors.onSurfaceDisabled }}>
              {I18n.Post.End}
            </Text>
          ) : null}
        </View>
      }
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
      renderItem={({ item, index }) =>
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
          <PostCard body={item.body} key={index} />
        )
      }
      estimatedItemSize={200}
    />
  )
}

export default ProfilePost