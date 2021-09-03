import styled from 'styled-components'
import { ButtonTypes } from './button.types'
import { ThemeSelectors } from '../../../foundations/src/selectors/theme-selectors'

export const Button = styled.button<ButtonTypes>`
    background-color: ${({ displayType, theme }) => displayType === 'primary' ? ThemeSelectors.getPrimary(theme) : ThemeSelectors.getSecondary(theme)};    
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => ThemeSelectors.getWhite(theme)};    
    cursor: pointer;
    display: inline-block;
    outline: none;
    padding: 8px 12px;
`

// ${props =>
//     props.displayType === 'primary' &&
//     css`
//         background: ${props.inverted
//             ? ({ theme }) => ThemeSelectors.getWhite(theme)
//             : ({ theme }) => ThemeSelectors.getActionColor(theme)};

//         color: ${props.inverted
//             ? ({ theme }) => ThemeSelectors.getActionColor(theme)
//             : ({ theme }) => ThemeSelectors.getWhite(theme)};

//         &:hover {
//             color: ${props.inverted
//                 ? ({ theme }) => ThemeSelectors.getActionHoverColor(theme)
//                 : ({ theme }) => ThemeSelectors.getWhite(theme)};
//         }
