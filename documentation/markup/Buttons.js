import { styled, theme } from '../stitches.config'

const Wrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space.medium,
  gridColumn: '1 / 3',
})

const Button = styled('a', {
  textDecoration: 'none',
  fontFamily: 'sans-serif',
  color: theme.color.white,
  padding: theme.space.small,
  borderRadius: 10,
  border: '3px solid white',
  '&:hover': {
    background: '-webkit-linear-gradient(90deg, #FF85FA, #82D9FF)',
  },
  variants: {
    style: {
      full: {
        background: theme.color.white,
        color: 'black',
        mixBlendMode: 'lighten',
        '&:hover': {
          color: theme.color.white,
          mixBlendMode: 'normal',
        },
      },
    },
  },
})

export const Buttons = () => {
  return (
    <Wrapper>
      <Button style="full" href="/getting-started">
        Getting Started
      </Button>
      <Button href="https://github.com/tobua/responsive-react-native">GitHub</Button>
    </Wrapper>
  )
}
