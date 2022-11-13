import NextLink from 'next/link'
import { styled } from '../stitches.config'

export const TextLink = styled(NextLink, {
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
})

export const Link = styled(NextLink, {
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
