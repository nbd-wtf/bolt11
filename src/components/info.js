import styled, { css } from 'styled-components'

import { getTagColor } from '../utils/colors';

export const Info = styled.div`
  margin: 8px;
  padding: 8px;
  color: white;

  ${props =>
    css`
      background-color: ${getTagColor(props.name)};
    `}
`