import merge from 'deepmerge'
import { myDarkTheme } from './dark'
import { myLightTheme } from './light'

const NavDarkTheme = {
  dark: true,
  colors: {
    // primary: 'rgb(10, 132, 255)',
    background: myDarkTheme.colors.background,
    // card: 'rgb(18, 18, 18)',
    card: myDarkTheme.colors.background,
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)'
  }
}

const NavLightTheme = {
  dark: false,
  colors: {
    // primary: 'rgb(0, 122, 255)',
    background: myLightTheme.colors.background,
    // card: 'rgb(255, 255, 255)',
    card: myLightTheme.colors.background,
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)'
  }
}

export const CombinedDefaultTheme = merge(myLightTheme, NavLightTheme)
export const CombinedDarkTheme = merge(myDarkTheme, NavDarkTheme)
