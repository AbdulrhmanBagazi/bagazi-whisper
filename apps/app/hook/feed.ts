import { create } from 'zustand'

type FeedPostType = {
  initialFeedPosts: () => void
  initialFeedLoading: boolean
}

export const useFeedPostsHook = create<FeedPostType>((set) => ({
  initialFeedLoading: true,
  initialFeedPosts: async () => {
    set(() => ({
      initialFeedLoading: false
    }))
  }
}))
