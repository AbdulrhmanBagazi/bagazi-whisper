import { create } from 'zustand'

type CommentHookType = {
  CommentLoading: boolean
  OpenComment: () => void
  CloseComment: () => void
  setPostId: (post_id: string, post_author_id?: string) => void
  postId: string | null
  postAuthor: string | null
}

export const useCommentHook = create<CommentHookType>((set) => ({
  postId: '',
  postAuthor: null,
  CommentLoading: true,
  OpenComment: async () => {
    set(() => ({
      CommentLoading: false
    }))
  },
  setPostId: async (post_id, post_author_id) => {
    set(() => ({
      postId: post_id,
      postAuthor: post_author_id
    }))
  },
  CloseComment: async () => {
    set(() => ({
      CommentLoading: true,
      postId: null,
      postAuthor: null
    }))
  }
}))
