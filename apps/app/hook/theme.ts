import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'

type ThemeType = {
  ToggleTheme: (dark: boolean) => void
  ThemeStore: () => void
  Dark: boolean
}

export const useThemeHook = create<ThemeType>((set) => ({
  Dark: true,
  ToggleTheme: async (dark) => {
    await SecureStore.setItemAsync('AppTheme-Whisper', dark ? 'dark' : 'light')
    set((state) => ({
      Dark: !state.Dark
    }))
  },
  ThemeStore: async () => {
    const DarkStore = await SecureStore.getItemAsync('AppTheme-Whisper')
    set(() => ({
      Dark: DarkStore === 'light' ? false : true
    }))
  }
}))
