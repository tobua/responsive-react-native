import { styled, theme } from '../stitches.config'

const Wrapper = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '50%',
  gap: theme.space.medium,
})

const Title = styled('div', {
  fontSize: 24,
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  color: theme.color.white,
})

const Description = styled('div', {
  fontFamily: 'sans-serif',
  color: theme.color.white,
})

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
  variants: {
    type: {
      code: {
        height: '20vh',
      },
    },
  },
})

const SkewedSeparator = styled('div', {
  background: 'white',
  width: '120vw',
  height: '15vh',
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
  variants: {
    type: {
      code: {
        top: '13vh',
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
        <TitleCode>{children}</TitleCode>
      </IntroBackground>
      <SkewedSeparator type={type} />
    </Intro>
  )
}
