import { Text, useTheme } from 'react-native-paper'
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
  const { I18n } = useI18nHook((state) => state)
  const { initialposts, loadMorePosts } = useProfilePostsHook((state) => state)
  const { posts, count } = useProfilePostsHook((state) => state)
  const { loading, error, refetch } = usePostQuery({
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
          <PostCard data={item} key={index} />
        )
      }
      estimatedItemSize={100}
    />
  )
}

export default ProfilePost
