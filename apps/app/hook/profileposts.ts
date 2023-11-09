import { create } from 'zustand'

type ProfilePostType = {
  initialposts: () => void
  initialLoading: boolean
}

export const useProfilePostsHook = create<ProfilePostType>((set) => ({
  initialLoading: true,
  initialposts: async () => {
    set(() => ({
      initialLoading: false
    }))
  }
}))
