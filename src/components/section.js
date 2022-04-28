import styled, { css } from 'styled-components'

import { getTagColor, withOpacity } from '../utils/colors'

export const Section = styled.span`
  font-family: monospace;
  letter-spacing: 1px;
  line-height: 37px;
  padding: 5px 0;
  border-radius: 1px;
  font-size: 22px;
  color: #fff;
  cursor: pointer;

  ${props =>
    props.isAnyFixed ? css`
      background-color: ${withOpacity(getTagColor(props.name), 0.2)};
    ` : css`
      background-color: ${withOpacity(getTagColor(props.name), 0.6)};
    `
  }

  &:hover {
    ${props =>
      props.isFixed
        ? null
      : props.isAnyFixed ? css`
        background-color: ${withOpacity(getTagColor(props.name), 0.3)};
        filter: brightness(1.45);
      ` : css`
        background-color: ${getTagColor(props.name)};
      `
    }
  }

  ${props =>
    props.isFixed ? css`
      background-color: ${getTagColor(props.name)};
    ` : null
  }
`
