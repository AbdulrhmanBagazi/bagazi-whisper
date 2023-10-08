import { create } from 'zustand'
import { Get_More_PostQuery, Post, PostQuery } from '../graphql/generated'

type ProfilePostType = {
  initialposts: (data: PostQuery) => void
  addPost: (data: Post) => void
  loadMorePosts: (data: Get_More_PostQuery) => void
  posts: Array<Post>
  count: number
  initialLoading: boolean
}

export const useProfilePostsHook = create<ProfilePostType>((set) => ({
  posts: [],
  count: 0,
  initialLoading: true,
  initialposts: async (data) => {
    set(() => ({
      posts: data.Get_Post,
      count: data.Get_Post_Meta.count,
      initialLoading: false
    }))
  },
  addPost: async (data) => {
    set((state) => ({
      posts: [data, ...state.posts],
      count: state.count + 1
    }))
  },
  loadMorePosts: async (data) => {
    // console.log(useProfilePostsHook.getState().count)
    set((state) => ({
      posts: [...state.posts, ...data.Get_More_Post]
    }))
  }
}))
