import { create } from 'zustand'
import Arabic from '../language/Arabic.json'
import English from '../language/English.json'
import * as SecureStore from 'expo-secure-store'
import * as Updates from 'expo-updates'
import { I18nManager } from 'react-native'

type ar = 'ar'
type en = 'en'

export type Language = ar | en
export type I18n = typeof Arabic | typeof English
type DirectionType = 'rtl' | 'ltr'

type I18nType = {
  ToggleI18n: (Language: Language) => void
  I18nStore: () => void
  Language: Language
  I18n: I18n
  Direction: DirectionType
}

export const useI18nHook = create<I18nType>((set) => ({
  Language: 'ar',
  I18n: Arabic,
  Direction: 'rtl',
  ToggleI18n: async (Language: Language) => {
    await SecureStore.setItemAsync('AppLang-Whisper', Language)
    I18nManager.allowRTL(Language === 'ar' ? true : false)
    I18nManager.forceRTL(Language === 'ar' ? true : false)

    set(() => ({
      Language,
      I18n: Language === 'en' ? English : Arabic,
      Direction: Language === 'en' ? 'ltr' : 'rtl'
    }))

    await Updates.reloadAsync()
  },
  I18nStore: async () => {
    const Language = await SecureStore.getItemAsync('AppLang-Whisper')
    set(() => ({
      Language: Language === 'ar' ? 'ar' : 'en',
      I18n: Language === 'ar' ? Arabic : English,
      Direction: Language === 'ar' ? 'rtl' : 'ltr'
    }))
  }
}))
