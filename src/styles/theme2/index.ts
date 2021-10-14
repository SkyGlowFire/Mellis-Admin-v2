import {createTheme} from '@mui/material/styles'

import colors, {IColors} from './colors/colors.module.scss'
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';

export interface IColorOptions {
    colors: IColors
    heading: string
    paper: string
    backgroundDefault: string
    background: string
    darkTextPrimary: string
    darkTextSecondary: string
    textDark: string
    menuSelected: string
    menuSelectedBack: string
    divider: string
}

const colorOptions: IColorOptions = {
    colors,
    heading: colors.grey900,
    paper: colors.paper,
    backgroundDefault: colors.paper,
    background: colors.primaryLight,
    darkTextPrimary: colors.grey700,
    darkTextSecondary: colors.grey500,
    textDark: colors.grey900,
    menuSelected: colors.secondaryDark,
    menuSelectedBack: colors.secondaryLight,
    divider: colors.grey200,
};

declare module '@mui/material/styles' {

  interface Palette {
    orange: Palette['primary'];
  }

  interface PaletteOptions {
    orange?: PaletteOptions['primary'];
  }
}

export const MyTheme = createTheme({
    palette: themePalette(colorOptions),
    components: componentStyleOverrides(colorOptions)
})