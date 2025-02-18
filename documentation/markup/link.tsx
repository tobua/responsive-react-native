import { styled, theme } from '../stitches.config'

export const TextLink = styled('a', {
  outline: 'none',
  textDecoration: 'none',
  background: '-webkit-linear-gradient(0deg, #FF85FA, #82D9FF)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  '&:hover,&:focus': {
    background: '-webkit-linear-gradient(180deg, #FF85FA, #82D9FF)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  variants: {
    color: {
      black: {
        color: 'black',
        background: 'none',
        '-webkit-background-clip': 'initial',
        '-webkit-text-fill-color': 'initial',
        '&:hover,&:focus': {
          fontWeight: 'bold',
          color: theme.color.highlight,
          background: 'none',
          '-webkit-background-clip': 'initial',
          '-webkit-text-fill-color': 'initial',
        },
      },
    },
  },
})

export const Link = styled('a', {
  fontFamily: 'sans-serif',
  color: 'black',
  textDecoration: 'none',
  outline: 'none',
  '&:hover,&:focus': {
    background: '-webkit-linear-gradient(0deg, #FF85FA, #82D9FF)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
})

export const Anchor = styled('a', {
  textDecoration: 'none',
})
