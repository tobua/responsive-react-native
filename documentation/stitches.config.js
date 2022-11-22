import { createStitches } from '@stitches/react'

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
  createStitches({
    theme: {
      color: {
        gray: 'lightgray',
        codeBackground: '#EFEFEF',
        white: 'white',
        highlight: '#82D9FF',
        interact: '#FF85FA',
      },
      space: {
        small: '10px',
        medium: '20px',
        large: '40px',
        huge: '80px',
      },
    },
    media: {
      phone: '(max-width: 500px)',
      tablet: '(max-width: 1000px)',
      desktop: '(min-width: 1000px)',
      widescreen: '(min-width: 1500px)',
    },
    utils: {
      marginX: (value) => ({ marginLeft: value, marginRight: value }),
    },
  })
