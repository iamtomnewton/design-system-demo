import React from 'react'
import { ThemeProvider } from 'styled-components'
import { bilbasenTheme } from '../../../foundations/src/themeCatalogue'
import { bilbasenDarkTheme } from '../../../foundations/src/themeCatalogue'
import { dbaTheme } from '../../../foundations/src/themeCatalogue'
import { dbaDarkTheme } from '../../../foundations/src/themeCatalogue'
import { ButtonTypes } from './button.types'

import * as styled from './button.styles'

export const Button = ({ text }: ButtonTypes) => {
    return (
        <ThemeProvider theme={bilbasenTheme}>
            <styled.Button>{text}</styled.Button>
        </ThemeProvider>
    )
}
