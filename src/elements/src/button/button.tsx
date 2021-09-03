import React from 'react'
import { ButtonTypes } from './button.types'

import * as styled from './button.styles'

export const Button = ({ text }: ButtonTypes) => {
    return (
        <styled.Button>{text}</styled.Button>
    )
}
