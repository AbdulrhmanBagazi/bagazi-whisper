import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'

type ThemeType = {
  ToggleTheme: (dark: boolean) => void
  ThemeStore: () => void
  Dark: boolean
}

export const useThemeHook = create<ThemeType>((set) => ({
  Dark: false,
  ToggleTheme: async (dark) => {
    await SecureStore.setItemAsync('AppTheme', dark ? 'dark' : 'light')
    set((state) => ({
      Dark: !state.Dark
    }))
  },
  ThemeStore: async () => {
    const DarkStore = await SecureStore.getItemAsync('AppTheme')
    set(() => ({
      Dark: DarkStore === 'dark' ? true : false
    }))
  }
}))
