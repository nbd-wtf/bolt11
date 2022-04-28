import styled, { css } from 'styled-components'

import { getTagColor } from '../utils/colors'

export const InfoWrapper = styled.div`
    min-height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;

    ${props => css`
        background-color: ${props.name ? getTagColor(props.name) : '#0D0F1B'};
    `}
`
