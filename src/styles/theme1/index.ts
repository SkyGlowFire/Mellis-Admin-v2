import {createTheme} from '@mui/material/styles'
import { componentOptions } from './compStyleOverride'
import {paletteOptions} from './palette'

export const MyTheme = createTheme({
    palette: paletteOptions,
     shape: {
      borderRadius: 4,
    },
    components: componentOptions
})

