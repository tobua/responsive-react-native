import { styled, theme } from '../stitches.config'
import { Footer } from '../markup/footer'
import { Repl } from '../markup/repl'
import { Features } from '../markup/features'
import { Buttons } from '../markup/buttons'
import { ResponsiveStyleSheet, ScaledValues, AdaptiveValues, Breakpoints } from '../markup/feature-big'
import { ContentGrid } from '../markup/general'
import { Code } from '../markup/code'
import { StyledIntro } from '../markup/styled-intro'
import { NextPage } from '../markup/next-page'
import { BlogPost } from '../markup/blog-post'
import { Layout } from '../markup/layout'

const Title = styled('h1', {
  color: 'white',
  fontFamily: 'Roboto Serif, serif',
  margin: 0,
  padding: 0,
  gridColumn: '1 / 3',
  '@tablet': {
    gridColumn: 'initial',
  },
})

const IntroGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.space.large,
  alignItems: 'center',
  height: '80%',
  maxWidth: 1000,
  marginLeft: theme.space.medium,
  marginRight: theme.space.medium,
  '@tablet': {
    gridTemplateColumns: '1fr',
    height: 'auto',
  },
})

export function Overview() {
  return (
    <>
      <Layout type="intro">
        <IntroGrid>
          <Title>Out-of-the-box Responsive StyleSheets for React Native.</Title>
          <Features />
          <Code>{`import { createStyles } from 'responsive-react-native'

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
)`}</Code>
          <Buttons />
        </IntroGrid>
      </Layout>
      <Repl />
      <ResponsiveStyleSheet />
      <ScaledValues />
      <AdaptiveValues />
      <Breakpoints />
      <StyledIntro />
      <BlogPost />
      <ContentGrid>
        <NextPage name="Getting Started" href="/getting-started" />
      </ContentGrid>
      <Footer />
    </>
  )
}
