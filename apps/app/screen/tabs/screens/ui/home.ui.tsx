import { ActivityIndicator, View } from 'react-native'
import {
  FeedPosts,
  FeedQuery,
  FeedRequest,
  useFeedQuery
} from '../../../../graphql/generated'
import { useFeedPostsHook } from '../../../../hook/feed'
import React, { useCallback, useRef, useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import { FlashList } from '@shopify/flash-list'
import { useI18nHook } from '../../../../hook/i18n'
import { useTheme, Text, Divider } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FeedCard from '../../../../components/feed/feedCard'
import { windowHeight } from '../../../../config/config'
import Sheet from '../../../../components/bottomSheet/bottomSheet'
import BottomSheet from '@gorhom/bottom-sheet'
import { useCommentHook } from '../../../../hook/comment'

const HomeUI = () => {
  const sheetRef = useRef<BottomSheet>(null)
  const theme = useTheme()
  const { I18n } = useI18nHook((state) => state)
  const { setPostId } = useCommentHook()
  const [end, setend] = useState(false)
  const { initialFeedLoading, initialFeedPosts } = useFeedPostsHook()
  const { loading, refetch, fetchMore, data, networkStatus } = useFeedQuery({
    variables: {
      type: FeedRequest.Inital
    },
    onCompleted() {
      if (initialFeedLoading) {
        return initialFeedPosts()
      }
      return
    }
  })

  const More = async (FeedData: FeedQuery | undefined) => {
    if (FeedData?.Feed.length === 0) {
      return
    }
    const { data } = await fetchMore({
      variables: {
        type: FeedRequest.More,
        cursor: FeedData?.Feed[FeedData.Feed.length - 1].id
      },
      updateQuery(previousQueryResult, options) {
        return Object.assign({}, previousQueryResult, {
          Feed: [...previousQueryResult.Feed, ...options.fetchMoreResult.Feed]
        })
      }
    })

    if (data.Feed.length === 0) {
      return setend(true)
    }
  }

  const New = async (FeedData: FeedQuery | undefined) => {
    if (FeedData?.Feed.length === 0) {
      const data = await refetch({
        type: FeedRequest.Inital
      })

      return initialFeedPosts()
    }

    return await fetchMore({
      variables: {
        type: FeedRequest.New,
        cursor: FeedData?.Feed[0].id
      },
      updateQuery(previousQueryResult, options) {
        return Object.assign({}, previousQueryResult, {
          Feed: [...options.fetchMoreResult.Feed, ...previousQueryResult.Feed]
        })
      }
    })
  }

  const handleSnapPress = useCallback(
    (index: number, post_id: string, author_id: string) => {
      setPostId(post_id, author_id)
      sheetRef.current?.snapToIndex(index)
    },
    []
  )

  const renderItem = useCallback(
    ({ item, index }: { item: FeedPosts; index: number }) => (
      <FeedCard
        data={item}
        index={index}
        OpenComments={() => handleSnapPress(0, item.id, item.authorId)}
      />
    ),
    []
  )

  if (initialFeedLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        contentContainerStyle={{ paddingBottom: 25 }}
        // showsVerticalScrollIndicator={false}
        data={data?.Feed}
        // data={[]}
        refreshing={networkStatus === 4}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => New(data)}
            tintColor={theme.colors.onBackground}
          />
        }
        onEndReached={() => (loading || end ? null : More(data))}
        scrollsToTop={false}
        ListFooterComponent={
          <View
            style={{
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: theme.colors.surfaceDisabled }}>
              {end ? I18n.Post.End : ''}
            </Text>
            <ActivityIndicator animating={loading} />
          </View>
        }
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: windowHeight / 4
            }}
          >
            <MaterialCommunityIcons
              name="note-off"
              size={100}
              color={theme.colors.surfaceDisabled}
            />
          </View>
        )}
        renderItem={renderItem}
        estimatedItemSize={50}
      />

      <Sheet sheetRef={sheetRef} />
    </View>
  )
}

export default HomeUI
