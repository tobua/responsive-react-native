import Head from 'next/head'
import { SandpackProvider, SandpackCodeViewer } from '@codesandbox/sandpack-react'
import { styled, theme } from '../stitches.config'
import { Footer } from '../markup/Footer'
import { Repl } from '../markup/Repl'
import { Features } from '../markup/Features'
import { Buttons } from '../markup/Buttons'

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
})

const Center = styled('div', {
  display: 'flex',
  justifyContent: 'center',
})

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  maxWidth: 1000,
  paddingLeft: theme.space.medium,
  paddingRight: theme.space.medium,
  variants: {
    size: {
      wide: {
        maxWidth: 1200,
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
})

const Title = styled('h1', {
  color: 'white',
  fontFamily: 'Roboto Serif, serif',
  margin: 0,
  padding: 0,
  gridColumn: '1 / 3',
})

const IntroGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.space.large,
  alignItems: 'center',
  height: '80%',
  maxWidth: 1000,
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Responsive React Native</title>
      </Head>
      <Intro>
        <IntroBackground>
          <IntroGrid>
            <Title>Out-of-the-box Responsive StyleSheets for React Native.</Title>
            <Features />
            <SandpackProvider
              style={{ flexBasis: '50%' }}
              template="react"
              files={{
                '/App.js': `import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    backgroundColor: 'red',
    width: 200,
    height: 100,
    padding: 10
  },
  text: {
    fontSize: 16
  }
})

export default () => (
  <View style={styles.view}>
    <Text style={styels.text}>Hello Responsive</Text>
  </View>
)`,
              }}
            >
              <SandpackCodeViewer />
            </SandpackProvider>
            <Buttons />
          </IntroGrid>
        </IntroBackground>
        <SkewedSeparator />
      </Intro>
      <Center>
        <Content size="wide">
          <Repl />
        </Content>
      </Center>
      <Center>
        <Content>
          <Footer />
        </Content>
      </Center>
    </>
  )
}
