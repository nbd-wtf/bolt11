import styled, { css } from 'styled-components'

import { getTagColor } from '../utils/colors'

export const InfoWrapper = styled.div`
    display: flex;
    margin-top: 30px;
    min-height: 120px;
    border-radius: 8px;
    flex-direction: column;

    ${props => css`
        background-color: ${props.name ? getTagColor(props.name) : '#0D0F1B'};
    `}
`
