import { ActivityIndicator, View } from 'react-native'
import { FeedRequest, useFeedQuery } from '../../../../graphql/generated'
import { useFeedPostsHook } from '../../../../hook/feed'
import { useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import { FlashList } from '@shopify/flash-list'
import { useI18nHook } from '../../../../hook/i18n'
import { useTheme, Text } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FeedCard from '../../../../components/feed/feedCard'
import { windowHeight } from '../../../../config/config'

const HomeUI = () => {
  const theme = useTheme()
  const { I18n } = useI18nHook((state) => state)
  const [end, setend] = useState(false)
  const {
    initialFeedLoading,
    initialFeedPosts,
    feed,
    loadMoreFeed,
    newFeedPosts
  } = useFeedPostsHook()
  const { loading, refetch, fetchMore, data } = useFeedQuery({
    variables: {
      type: FeedRequest.Inital
    },
    onCompleted(data) {
      if (initialFeedLoading) {
        return initialFeedPosts(data)
      }
      return
    }
  })

  const More = async () => {
    if (feed.length === 0) {
      return
    }
    const { data } = await fetchMore({
      variables: {
        type: FeedRequest.More,
        cursor: feed[feed.length - 1].id
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

    return loadMoreFeed(data)
  }

  const New = async () => {
    if (feed.length === 0) {
      const data = await refetch({
        type: FeedRequest.Inital
      })

      return initialFeedPosts(data.data)
    }

    const { data } = await fetchMore({
      variables: {
        type: FeedRequest.New,
        cursor: feed[0].id
      },
      updateQuery(previousQueryResult, options) {
        return Object.assign({}, previousQueryResult, {
          Feed: [...options.fetchMoreResult.Feed, ...previousQueryResult.Feed]
        })
      }
    })

    return newFeedPosts(data)
  }

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
        showsVerticalScrollIndicator={false}
        data={data?.Feed}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => New()} />
        }
        onEndReached={() => (loading || end ? null : More())}
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
        renderItem={({ item, index }) => <FeedCard data={item} index={index} />}
        estimatedItemSize={100}
      />
    </View>
  )
}

export default HomeUI
