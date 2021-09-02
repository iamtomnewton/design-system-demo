import styled from 'styled-components'
import { ButtonTypes } from './button.types'
import { ThemeSelectors } from '../../../foundations/src/selectors/theme-selectors'

export const Button = styled.button<ButtonTypes>`
    background-color: ${({ theme }) => ThemeSelectors.getPrimary(theme)};    
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => ThemeSelectors.getWhite(theme)};    
    cursor: pointer;
    display: inline-block;
    outline: none;
    padding: 8px 12px;
`