import styled, { css } from 'styled-components'

import { getTagColor } from '../utils/colors'

export const Section = styled.span`
  font-family: monospace;
  letter-spacing: 1px;
  line-height: 36px;
  font-size: 22px;
  color: #fff;
  cursor: pointer;

  ${props =>
    css`
      background-color: ${getTagColor(props.name)
        .replace('rgb', 'rgba')
        .replace(')', ', 0.5)')};
    `}

  &:hover {
    color: white;

    ${props =>
      css`
        background-color: ${getTagColor(props.name)};
      `}
  }
`
