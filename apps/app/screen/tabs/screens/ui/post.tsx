import { Text, useTheme } from 'react-native-paper'
import { View, ActivityIndicator } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useI18nHook } from '../../../../hook/i18n'
import { useGet_More_PostQuery } from '../../../../graphql/generated'
import PostCard from '../../../../components/postCard'
import { useProfilePostsHook } from '../../../../hook/profileposts'
import { useState } from 'react'

const ProfilePost = () => {
  const theme = useTheme()
  const { I18n } = useI18nHook((state) => state)
  const { loadMorePosts } = useProfilePostsHook((state) => state)
  const { posts, count } = useProfilePostsHook((state) => state)
  const [loading, setloading] = useState(false)
  const [endReached, setendReached] = useState(false)
  const { refetch } = useGet_More_PostQuery({
    skip: true
  })

  const More = async () => {
    setloading(true)

    if (posts.length === count) {
      setendReached(true)
      setloading(false)

      return
    }

    return refetch({
      cursor: posts[posts.length - 1].id
    }).then((data) => {
      setTimeout(() => {
        setloading(false)
        loadMorePosts(data.data)
      }, 300)
      return
    })
  }

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      data={posts}
      contentContainerStyle={{ paddingBottom: 25 }}
      onEndReached={() => (loading ? null : More())}
      ListFooterComponent={
        <View
          style={{
            padding: 25,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {endReached && posts.length > 0 ? (
            <Text style={{ color: theme.colors.surfaceDisabled }}>
              {I18n.Post.End}
            </Text>
          ) : loading ? (
            <ActivityIndicator animating={loading} />
          ) : null}
        </View>
      }
      ListEmptyComponent={() => (
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
      )}
      renderItem={({ item, index }) => <PostCard data={item} key={index} />}
      estimatedItemSize={100}
    />
  )
}

export default ProfilePost
