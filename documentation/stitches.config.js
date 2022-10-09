import { createStitches } from '@stitches/react'

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
  createStitches({
    theme: {
      color: {
        gray: 'lightgray',
        white: 'white',
      },
      space: {
        small: '10px',
        medium: '20px',
        large: '40px',
        huge: '80px',
      },
    },
    media: {
      tablet: '(min-width: 500px)',
      desktop: '(min-width: 1000px)',
      widescreen: '(min-width: 1500px)',
    },
    utils: {
      marginX: (value) => ({ marginLeft: value, marginRight: value }),
    },
  })
