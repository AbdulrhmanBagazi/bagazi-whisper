import { create } from 'zustand'
import { FeedQuery, FeedPosts } from '../graphql/generated'

type FeedPostType = {
  initialFeedPosts: (data: FeedQuery) => void
  loadMoreFeed: (data: FeedQuery) => void
  feed: Array<FeedPosts>
  initialFeedLoading: boolean
  newFeedPosts: (data: FeedQuery) => void
}

export const useFeedPostsHook = create<FeedPostType>((set) => ({
  feed: [],
  initialFeedLoading: true,
  initialFeedPosts: async (data) => {
    set(() => ({
      feed: data.Feed,
      initialFeedLoading: false
    }))
  },
  loadMoreFeed: async (data) => {
    // console.log(useProfilePostsHook.getState().count)
    set((state) => ({
      feed: [...state.feed, ...data.Feed]
    }))
  },
  newFeedPosts: async (data) => {
    // console.log(useProfilePostsHook.getState().count)
    set((state) => ({
      feed: [...data.Feed, ...state.feed]
    }))
  }
}))
