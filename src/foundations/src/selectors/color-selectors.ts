import { DefaultTheme as Theme } from '../../../tokens/dist/styles'

//! DO NOT IMPORT FROM THIS FILE - USE './theme-selectors.ts' INSTEAD

export const getPrimary = (theme: Theme) => {
    return theme.color.brand.primary
}

export const getSecondary = (theme: Theme) => {
    return theme.color.brand.secondary
}

export const getWhite = (theme: Theme) => {
    return theme.color.base.white
}

export const getBlack = (theme: Theme) => {
    return theme.color.base.black
}

// export const getConfig = (theme: Theme, scope: string, property: string, variant: string = '') => {
//     return theme[scope][property]?.[variant]
// }

// export const getColor = (theme: Theme, property: string, variant: string = '') => {
//     return getConfig(theme, 'color', property, variant)
// }