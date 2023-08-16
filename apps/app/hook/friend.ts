import { create } from 'zustand'
import { Requests, Friend_RequestQuery } from '../graphql/generated'

type FriendHookType = {
  requests: Array<Requests>
  setRequests: (data: Friend_RequestQuery) => void
  updateRequests: (id: string) => void
}

export const useFriendHook = create<FriendHookType>((set, get) => ({
  requests: [],
  setRequests: async (data) => {
    set(() => ({
      requests: data.Get_Friend_Request
    }))
  },
  updateRequests: async (id) => {
    const Updated = useFriendHook.getState().requests.filter((r) => r.id != id)

    set(() => ({
      requests: Updated
    }))
  }
}))
