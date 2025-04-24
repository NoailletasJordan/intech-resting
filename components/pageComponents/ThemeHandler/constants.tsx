const LIGHT_BACKGROUND = '#f0f0f0'
const LIGHT_PRIMARY = '#b8de16'
const LIGHT_TEXT = '#666'
const LIGHT_TEXT_LIGHT = '#000'

export const themeDark = {
  '--color-border': '#333',
  '--color-border-active': '#505050',
  '--color-surface-light': '#202126',
  '--color-surface-lighter': '#26272b',
  '--color-background-line': '#3338',
  '--color-background': '#1b1c20',
  '--color-background-opposite': LIGHT_BACKGROUND,
  '--color-background-primary': '#D6FF03',
  '--color-background-dark': '#111',
  '--color-primary': '#dcff46',
  '--color-primary-opposite': LIGHT_PRIMARY,
  '--color-text': '#d3d3d3',
  '--color-text-light': '#fff',
  '--color-text-subtle': '#2f3032',
  '--color-text-opposite': LIGHT_TEXT,
  '--color-text-light-opposite': LIGHT_TEXT_LIGHT,
}

export const themeIntechResting = {
  ...themeDark,
  '--color-text': '#e3e3e3',
  '--color-background': '#121317',
}

export const themeLight = {
  '--color-background': LIGHT_BACKGROUND,
  '--color-background-opposite': themeDark['--color-background'],
  '--color-primary': LIGHT_PRIMARY,
  '--color-primary-opposite': themeDark['--color-primary'],
  '--color-text': LIGHT_TEXT,
  '--color-text-light': LIGHT_TEXT_LIGHT,
  '--color-text-opposite': themeDark['--color-text'],
  '--color-text-light-opposite': themeDark['--color-text-light'],
  '--color-border': '#dadada',
}

export const CSSVAR = Object.keys(themeDark).reduce(
  (acc, cur) => ({ ...acc, [cur]: `var(${cur})` }),
  {},
) as Record<keyof typeof themeDark, string>

export type ThemeOverwrite = Partial<Record<keyof typeof themeDark, string>>
