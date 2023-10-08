import { RefreshControl } from 'react-native'
import { useFeedPostsHook } from '../../../../hook/feed'

const FeedRefetchNew = () => {
  const { feed, newFeedPosts } = useFeedPostsHook()

  return <RefreshControl refreshing={false} onRefresh={() => null} />
}

export default FeedRefetchNew
