import { ActivityIndicator, View } from 'react-native'
import { FeedRequest, useFeedQuery } from '../../../../graphql/generated'
import { useFeedPostsHook } from '../../../../hook/feed'
import Feed from './feed'
import { useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'

const HomeUI = () => {
  const [end, setend] = useState(false)
  const {
    initialFeedLoading,
    initialFeedPosts,
    feed,
    loadMoreFeed,
    newFeedPosts
  } = useFeedPostsHook()
  const { loading, refetch } = useFeedQuery({
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

  if (initialFeedLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating />
      </View>
    )
  }

  const More = async () => {
    if (feed.length === 0) {
      return
    }
    const data = await refetch({
      type: FeedRequest.More,
      cursor: feed[feed.length - 1].id
    })

    if (data.data.Feed.length === 0) {
      return setend(true)
    }

    return loadMoreFeed(data.data)
  }

  const New = async () => {
    if (feed.length === 0) {
      const data = await refetch({
        type: FeedRequest.Inital
      })

      return initialFeedPosts(data.data)
    }

    const data = await refetch({
      type: FeedRequest.New,
      cursor: feed[0].id
    })

    return newFeedPosts(data.data)
  }

  return (
    <View style={{ flex: 1 }}>
      <Feed
        feed={feed}
        end={end}
        loading={loading}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => New()} />
        }
        onEndReached={() => (loading || end ? null : More())}
      />
    </View>
  )
}

export default HomeUI
