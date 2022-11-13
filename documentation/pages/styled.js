import Head from 'next/head'
import { theme } from '../stitches.config'
import { Footer } from '../markup/Footer'
import { Layout } from '../markup/Layout'
import { Code } from '../markup/Code'
import { NextPage } from '../markup/NextPage'
import { Center, Content, Title } from '../markup/General'

export default function Styled() {
  return (
    <>
      <Head>
        <title>Styled Interface - Responsive React Native</title>
      </Head>
      <Layout>Styled Interface</Layout>
      <Center>
        <Content>
          <Title>Installation</Title>
          <Code
            backgroundColor={theme.color.codeBackground}
          >{`npm i responsive-react-native`}</Code>
          <Title>Usage</Title>
          <NextPage name="Configuration" href="/configuration" />
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
