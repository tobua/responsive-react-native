import Head from 'next/head'
import { styled, theme } from '../stitches.config'
import { Footer } from '../markup/Footer'
import { Code } from '../markup/Code'
import { Layout } from '../markup/Layout'

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

const Title = styled('h2', {
  fontFamily: 'sans-serif',
})

export default function GettingStarted() {
  return (
    <>
      <Head>
        <title>Getting Started - Responsive React Native</title>
      </Head>
      <Layout>Getting Started</Layout>
      <Center>
        <Content>
          <Title>Installation</Title>
          <Code
            backgroundColor={theme.color.codeBackground}
          >{`npm i responsive-react-native`}</Code>
          <Title>Usage</Title>
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
