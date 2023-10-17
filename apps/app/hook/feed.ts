import { create } from 'zustand'
import { FeedQuery, FeedPosts, LikeMutation } from '../graphql/generated'

type FeedPostType = {
  initialFeedPosts: (data: FeedQuery) => void
  loadMoreFeed: (data: FeedQuery) => void
  feed: Array<FeedPosts>
  initialFeedLoading: boolean
  newFeedPosts: (data: FeedQuery) => void
  updateFeedPost: (data: LikeMutation, index: number) => void
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
  },
  updateFeedPost: async (data, index) => {
    // console.log(useProfilePostsHook.getState().count)
    if (data.Like) {
      const feed: Array<FeedPosts> = useFeedPostsHook.getState().feed
      feed[index] = data.Like

      set(() => ({
        feed: feed
      }))
    }
  }
}))
