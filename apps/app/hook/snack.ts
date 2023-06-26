import { create } from 'zustand'

type SnackType = {
  ShowSnack: (text: string) => void
  HideSnack: () => void
  show: boolean
  text: String | null
}

export const useSnckHook = create<SnackType>((set) => ({
  show: false,
  text: null,
  ShowSnack: async (text: string) => {
    set(() => ({
      show: true,
      text
    }))
  },
  HideSnack: async () => {
    set(() => ({
      show: false,
      text: null
    }))
  }
}))
