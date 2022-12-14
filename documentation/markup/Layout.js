import { styled, theme } from '../stitches.config'
import { TextLink } from './Link'

const Intro = styled('div', {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
})

const IntroBackground = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: `linear-gradient(#FF85FA, #82D9FF)`,
  height: '100vh',
  paddingTop: theme.space.medium,
  '@tablet': {
    height: 'auto',
    paddingBottom: theme.space.huge,
    marginBottom: theme.space.large,
  },
  variants: {
    type: {
      code: {
        height: 180,
        '@tablet': {
          height: 160,
          marginBottom: 0,
          paddingBottom: 0,
        },
      },
    },
  },
})

const SkewedSeparator = styled('div', {
  background: 'white',
  width: '120vw',
  height: 200,
  transform: 'rotate(-5deg)',
  position: 'absolute',
  top: '93vh',
  left: '-5vw',
  '@desktop': {
    transform: 'rotate(-3deg)',
  },
  '@widescreen': {
    transform: 'rotate(-2deg)',
  },
  '@tablet': {
    top: 'initial',
    bottom: '-2vh',
    height: 100,
    transform: 'rotate(-3deg)',
  },
  variants: {
    type: {
      code: {
        top: '70%',
        '@tablet': {
          top: '80%',
        },
      },
    },
  },
})

const TitleCode = styled('h1', {
  color: 'white',
  fontFamily: 'Roboto Serif, serif',
  margin: 0,
  padding: 0,
  gridColumn: '1 / 3',
  marginTop: theme.space.medium,
})

export const Layout = ({ type = 'code', children }) => {
  if (type === 'intro') {
    return (
      <>
        <Intro>
          <IntroBackground>{children}</IntroBackground>
          <SkewedSeparator />
        </Intro>
      </>
    )
  }

  return (
    <Intro>
      <IntroBackground type={type}>
        <TextLink color="black" css={{ fontFamily: 'sans-serif' }} href="/">
          Home
        </TextLink>
        <TitleCode>{children}</TitleCode>
      </IntroBackground>
      <SkewedSeparator type={type} />
    </Intro>
  )
}
