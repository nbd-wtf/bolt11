import styled, { css } from 'styled-components'

import { getTagColor } from '../utils/colors';

export const Section = styled.span`
  font-family: monospace;
  font-size: 25px;

  ${props =>
    css`
      background-color: ${getTagColor(props.name)
        .replace('rgb', 'rgba')
        .replace(')', ', 0.2)')};
    `}

  &:hover {
    color: white;

    ${props =>
      css`
        background-color: ${getTagColor(props.name)};
      `}
  }
`