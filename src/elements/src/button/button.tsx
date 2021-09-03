import { ButtonTypes } from './button.types'

import * as styled from './button.styles'

export const Button = ({ label, displayType = 'primary' }: ButtonTypes) => {
    return (
        <styled.Button displayType={displayType}>{label}</styled.Button>
    )
}