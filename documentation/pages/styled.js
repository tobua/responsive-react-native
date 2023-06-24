import Head from 'next/head'
import { theme } from '../stitches.config'
import { Footer } from '../markup/Footer'
import { Layout } from '../markup/Layout'
import { Code, CodeRepl } from '../markup/Code'
import { NextPage } from '../markup/NextPage'
import { ContentGrid, Important, InlineCode, Text, Title } from '../markup/General'

export default function Styled() {
  return (
    <>
      <Head>
        <title>Styled Interface - Responsive React Native</title>
      </Head>
      <Layout>Styled Interface</Layout>
      <ContentGrid>
        <Text>
          Inspired by styled-components for the web this interface allows to merge dynamic styles
          together with tags and reuse them. Regular React Native stylesheets can't be updated
          anymore without rerendering the whole tree. Using the Styled interface however doesn't
          require a full rerender through the <InlineCode>{`<Rerender />`}</InlineCode> component
          anymore. The linked styles will directly be updated whenever the viewport or the
          orientation changes. Additionally, styles for props can be added which also dynamically
          update the component's styles.
        </Text>
        <Code backgroundColor={theme.color.codeBackground}>{`import { View } from 'react-native'
import { Styled } from 'responsive-react-native'

const CustomView = Styled(
  View,
  {
    backgroundColor: 'gray',
    padding: 10,
  },
  {
    // Truthy prop.
    highlight: {
      backgroundColor: 'red',
    },
    // Current breakpoint.
    large: {
      backgroundColor: 'blue',
    },
    // Current OS.
    ios: {
      padding: 5,
    }
  }
)

export default () => <CustomView highlight />`}</Code>
        <Text>
          As the <Important>first argument</Important> the <InlineCode>Styled</InlineCode> method
          takes the component to extend. This can be a string representation of a React Native
          element or the element itself. The <Important>second argument</Important> takes the styles
          just like <InlineCode>createStyles</InlineCode> does. Scaleable values will automatically
          adapt linearly based on the viewport and adaptive values can be used to specify values for
          specific breakpoints or orientations. An optional <Important>third argument</Important>{' '}
          takes an object which can contain styles which will dynamically be applied if a truthy
          prop, a breakpoint, the operating system or the orientation matches a key.
        </Text>
        <Title>Observable Styles with MobX</Title>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`npm install mobx responsive-react-native`}</Code>
        <Text>
          When a function is passed and MobX is installed the styles will automatically adapt
          whenever any of the state accessed inside changes. The <InlineCode>Styled</InlineCode>{' '}
          method interface stays the same except that for the second and third argument a method
          returning base styles or conditional styles has to be passed.
        </Text>
        <CodeRepl
          backgroundColor={theme.color.codeBackground}
        >{`import { observable, runInAction } from 'mobx'
import { View, Button } from 'react-native'
import { Styled } from 'responsive-react-native'

const Store = observable({ highlight: false })

const ObservableView = Styled(View, () => ({
  backgroundColor: Store.highlight ? 'red' : 'gray',
  width: 50,
  height: 50
}))

export default () => (
  <View style={{ padding: 10 }}>
    <ObservableView />
    <Button
      title="Highlight"
      onPress={() =>
        runInAction(() => {
          Store.highlight = !Store.highlight
        })
      }
    />
  </View>
)`}</CodeRepl>
        <Text>
          When the state changes and this results in different styles being returned the styles will
          adapt without any React component themselves having to rerender.
        </Text>
        <NextPage name="Configuration" href="/configuration" />
      </ContentGrid>
      <Footer />
    </>
  )
}
