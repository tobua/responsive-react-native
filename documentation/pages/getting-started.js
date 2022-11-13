import Head from 'next/head'
import { theme } from '../stitches.config'
import { Footer } from '../markup/Footer'
import { Code } from '../markup/Code'
import { Layout } from '../markup/Layout'
import { TextLink, Anchor } from '../markup/Link'
import { NextPage } from '../markup/NextPage'
import { Center, Content, Title, Text, InlineCode } from '../markup/General'

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
          >{`npm install responsive-react-native`}</Code>
          <Title>Two Approaches</Title>
          <Text>
            There are two different ways to use responsive styles. The first uses the familiar
            Stylesheets used in React Native and automativally makes any scaleable values
            responsive. This approach requires that the whole application rerenders when the
            viewport changes. Usually, this is not an issue since viewport changes on mobile devices
            are rare. The second way uses styled components and requires a separate definition for
            each component. Using the latter interface requires more effort and is only recommended
            when starting with a new project. This interface doesn't require any rerenders and can
            conditionally apply styles based on component props.The{' '}
            <TextLink href="/styled">Styled API</TextLink> approach is explained in detail on a
            dedicated page.
          </Text>
          <Text>
            To quickly try out the Stylesheet approach on an existing project it's possible to
            override the <InlineCode>StyleSheet.create</InlineCode> method without touching every
            component. This is detailed in the{' '}
            <TextLink href="#refactoring">refactoring section</TextLink> below.
          </Text>
          <Title>Responsive Stylesheets</Title>
          <Code
            backgroundColor={theme.color.codeBackground}
          >{`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    padding: 20,
    height: 40,
    flex: 1, // Remains unmodified.
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 16,
  },
})

export const App = () => (
  <View style={styles.view}>
    <Text style={styles.text}>Hello Responsive World</Text>
  </View>
)`}</Code>
          <Title>How Does It Work?</Title>
          <Text>
            The pixel based values will scale depending on the viewport size of the device.
            Essentially, the values will more or less scale so that the layout will look the same on
            any device. By default at <InlineCode>420px</InlineCode> the value will stay the same.
            It's possible to <TextLink href="/configuration">configure</TextLink> the default
            viewport as well as the strength of the scaling.
          </Text>
          <Title>Rerendering</Title>
          <Text>
            Since Stylesheets are statically initialized and frozen at the top of the file they
            cannot be made to automatically adapt during rendering. The{' '}
            <InlineCode>createStyles</InlineCode> method works around this by returning a proxied
            object that can adapt based on the viewport. However, a full rerender of the application
            is still necessary when the viewport changes in order to get the new styles. Any part of
            the application wrapped in <InlineCode>{`<Rerender>`}</InlineCode> automatically
            rerenders on changes to the viewport. Usually this component is added directly at the
            application root as in the example below.
          </Text>
          <Code
            backgroundColor={theme.color.codeBackground}
          >{`import { View, Text } from 'react-native'
import { Rerender } from 'responsive-react-native'

function App() {
  return (
    <Rerender>
      {() => (
        <View>
          <Text>Hello World</Text>
        </View>
      )}
    </Rerender>
  )
}`}</Code>
          <Title>Adaptive Values (Breakpoints and Orientation)</Title>
          <Text>
            A custom Stylesheet syntax makes it easy to define breakpoint or orientation dependent
            styles directly in the stylesheet.
          </Text>
          <Code
            backgroundColor={theme.color.codeBackground}
          >{`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    backgroundColor: ['blue', 'red'], // => blue in portrait, red in landscape.
    height: { small: 40, large: 80 }, // => 40 for small and medium breakpoint, 80 on large breakpoint.
    padding: [
      { small: 40, medium: 60 },
      { small: 20, large: 80 },
    ], // Both approaches can be combined either way.
  },
})`}</Code>
          <Anchor id="refactoring">
            <Title>Refactoring an Existing Project</Title>
          </Anchor>
          <Text>
            Any project using the standard <InlineCode>StyleSheet.create</InlineCode> can quickly be
            modified to make all applicable properties scale responsively. This can be achieved by
            overriding said method.
          </Text>
          <Code
            backgroundColor={theme.color.codeBackground}
          >{`import { StyleSheet } from 'react-native'
import { createStyles } from 'responsive-react-native'

Object.assign(StyleSheet, { create: createStyles })`}</Code>
          <Text>
            Calls to <InlineCode>StyleSheet.create</InlineCode> are usually run before rendering
            occurs right away when the file is imported. This means that the override needs to
            happen before any components are imported. Placing the above code in a separate file and
            importing it before any components will achieve this.
          </Text>
          <Code
            backgroundColor={theme.color.codeBackground}
          >{`import { AppRegistry } from 'react-native'
import './refactor-stylesheet' // Import above code before any components.
import App from './App'

AppRegistry.registerComponent('responsive-app', () => App)`}</Code>
          <NextPage name="Features" href="/features" />
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
