import { IconButton, Text, useTheme } from 'react-native-paper'
import { View, ActivityIndicator } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useI18nHook } from '../../../../hook/i18n'
import {
  Post,
  PostQuery,
  PostsRequest,
  usePostQuery
} from '../../../../graphql/generated'
import PostCard from '../../../../components/postCard'
import { useProfilePostsHook } from '../../../../hook/profileposts'
import { useCallback, useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import Sheet from '../../../../components/bottomSheet/bottomSheet'
import { useCommentHook } from '../../../../hook/comment'
import { useAuthHook } from '../../../../hook/auth'

const ProfilePost = () => {
  const sheetRef = useRef<BottomSheet>(null)
  const theme = useTheme()
  const { I18n } = useI18nHook((state) => state)
  const { user } = useAuthHook()
  const { setPostId } = useCommentHook()
  const [endReached, setendReached] = useState(false)
  const { initialLoading, initialposts } = useProfilePostsHook((state) => state)
  const { loading, refetch, fetchMore, data, error } = usePostQuery({
    variables: {
      type: PostsRequest.Inital
    },
    onCompleted() {
      if (initialLoading) {
        return initialposts()
      }
      return
    },
    onError() {
      return initialposts()
    }
  })

  const handleSnapPress = useCallback((index: number, id: string) => {
    setPostId(id, user?.id)
    sheetRef.current?.snapToIndex(index)
  }, [])

  const renderItem = useCallback(
    ({ item, index }: { item: Post; index: number }) => (
      <PostCard
        data={item}
        key={index}
        OpenComments={() => handleSnapPress(0, item.id)}
      />
    ),
    []
  )

  const More = async (PostData: PostQuery | undefined) => {
    if (PostData?.Post.length === 0) {
      return
    }
    const { data } = await fetchMore({
      variables: {
        type: PostsRequest.More,
        cursor: PostData?.Post[PostData?.Post.length - 1].id
      },
      updateQuery(previousQueryResult, options) {
        return Object.assign({}, previousQueryResult, {
          Post: [...previousQueryResult.Post, ...options.fetchMoreResult.Post]
        })
      }
    })

    if (data.Post.length === 0) {
      return setendReached(true)
    }
  }

  if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating />
      </View>
    )
  }

  return (
    <>
      {error ? (
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

          <IconButton icon="refresh" onPress={() => refetch()} />
        </View>
      ) : (
        <>
          <FlashList
            // showsVerticalScrollIndicator={false}
            data={data?.Post}
            contentContainerStyle={{ paddingBottom: 25 }}
            onEndReached={() => (loading || endReached ? null : More(data))}
            keyExtractor={(item) => item.id}
            ListFooterComponent={
              <View
                style={{
                  padding: 25,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: theme.colors.surfaceDisabled }}>
                  {endReached ? I18n.Post.End : ''}
                </Text>
                <ActivityIndicator animating={loading} />
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
            renderItem={renderItem}
            estimatedItemSize={100}
          />
          <Sheet sheetRef={sheetRef} />
        </>
      )}
    </>
  )
}

export default ProfilePost
