import { css } from 'styled-components'

export const sizes = {
  mobile: 321,
  largeMobile: 375,
  smallTablet: 520,
  mediumTablet: 600,
  tablet: 769,
  largeTablet: 950,
  desktop: 1200,
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `

  return acc
}, {})

