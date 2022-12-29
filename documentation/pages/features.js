import Head from 'next/head'
import Image from 'next/image'
import { theme } from '../stitches.config'
import { Footer } from '../markup/Footer'
import { Code } from '../markup/Code'
import { Layout } from '../markup/Layout'
import { NextPage } from '../markup/NextPage'
import { TextLink } from '../markup/Link'
import { ContentGrid, Title, Important, Text, InlineCode } from '../markup/General'

export default function Features() {
  return (
    <>
      <Head>
        <title>Features - Responsive React Native</title>
      </Head>
      <Layout>Features</Layout>
      <ContentGrid>
        <Title>Scaled Values</Title>
        <Text>
          This type of responsive design hasn't found it's way into the web yet where breakpoints
          and static values are still preferred. Luckily, it's very easy to use and will work out of
          the box. All values influencing the scaling can also be{' '}
          <TextLink href="/configuration#scaled-values">configured</TextLink>.
        </Text>
        <Text>
          All scaleable values inside a stylesheet created with{' '}
          <InlineCode>createStyles</InlineCode> are automatically linearly scaled. At a medium
          viewport of <InlineCode>420px</InlineCode> the value will stay exactly the same. At the
          lower breakpoint of <InlineCode>320px</InlineCode> the value will be reduced by the
          scaling <InlineCode>factor</InlineCode> which is <InlineCode>0.5</InlineCode> by default.
          A factor of one would cut the value in half in this case while the default of{' '}
          <InlineCode>0.5</InlineCode> will remove a fourth. Below the{' '}
          <InlineCode>minimum</InlineCode> the value will stay the same which fine as there aren't
          any devices with smaller viewports. For bigger devices the value will scale linearly in
          the opposite direction until the <InlineCode>maximum</InlineCode> breakpoint of{' '}
          <InlineCode>520px</InlineCode>.
        </Text>
        <div style={{ height: 300, position: 'relative' }}>
          <Image fill src="/scale.svg" alt="Illustration of responsive scaling." />
        </div>
        <Text>
          The above chart illustrates how the linear scaling works and which values play a role.
        </Text>
        <Text>
          This type of responsive scaling usually takes no effort and can easily be integrated into
          existing applications. Due to the heavy use of pixel based scaling on mobile devices there
          is less fragmentation when it comes to the range of target viewports. This is one of the
          major reasons why responsive design currently isn't very popular for mobile devices.
          Still, there is slight fragmentation which is very well adressed by using scaled values
          which make a design created on a default device look the same on any kind of device. The
          issue of too much whitespace on large devices as well as an overcrowded design on smaller
          devices is gone.
        </Text>
        <Title>Adaptive Values (Breakpoints and Orientation)</Title>
        <Text>
          Just like Media Queries in CSS adaptive values allow values based on the current
          breakpoint or orientation. The syntax is deliberately kept terse to make responsive styles
          quick to write. <Important>Breakpoints</Important> are written as objects with their
          specific breakpoint as the key. If the current breakpoint is missing the nearest one below
          will be used. The values will no longer scale and are the same in any viewport where the
          breakpoint applies.
        </Text>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    height: { small: 40, large: 80 }
  }
})`}</Code>
        <Text>
          In the above example screens matching the small and medium viewport will receive a width
          of 40 while the large breakpoint gets value 80.
        </Text>
        <Text>
          Values that should match the orientation are written as arrays where the first key applies
          for portrait and the second for landscape.
        </Text>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    backgroundColor: ['blue', 'red']
  }
})`}</Code>
        <Text>In this example the background will be blue on portrait and red on landscape.</Text>
        <Title>
          <InlineCode>useResponsive</InlineCode> React Hook
        </Title>
        <Text>
          The current breakpoint as well as the orientation can be accessed during rendering to
          adapt the layout or content. Using this hook will automatically rerender the component any
          time the breakpoint or orientation changes.
        </Text>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`import { useResponsive } from 'responsive-react-native'

export default function App() {
  const { breakpoint, setBreakpoint, orientation } = useResponsive()
  return (
    <View style={{ margin: breakpoint === 'large' ? 0 : 10 }}>
      <Text>Current breakpoint: {breakpoint}</Text>
      <Button title="Set Breakpoint to Small" onPress={() => setBreakpoint('small')} />
    </View>
  )
}`}</Code>
        <Title>
          <InlineCode>{`getValue(value: number)`}</InlineCode>
        </Title>
        <Text>
          Internally used to render the scaleable stylesheet values this helper function can be used
          to get any responsive value.
        </Text>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`import { getValue } from 'responsive-react-native'

export const Header = () => <View style={{ height: getValue(50) }} />`}</Code>
        <Title>
          <InlineCode>{`linearScale(value: number, breakpoint: string)`}</InlineCode>
        </Title>
        <Text>
          Method used to scale values linearly according to{' '}
          <TextLink href="/configuration#scaled-values">scale</TextLink> configured. Useful when
          overriding the default <InlineCode>value</InlineCode> method but still needing the
          linearly scaled value.
        </Text>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`import { linearScale, configure } from 'responsive-react-native'

configure({
  value: (value: number, breakpoint: string, orientation: 'portrait' | 'landscape') => {
    const scaledValue = linearScale(value, breakpoint)

    // Linear scaling only for portrait.
    if (orientation === 'portrait') {
      return scaledValue
    }

    return value
  },
})`}</Code>
        <Title>
          <InlineCode>{`<SelectBreakpoint />`}</InlineCode> Component to Test Breakpoints
        </Title>
        <Text>
          This utility component can be placed anywhere to get a UI to quickly switch between
          different breakpoints.
        </Text>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`import { SelectBreakpoint } from 'responsive-react-native'

export const Settings = () => (
  <View>
    <SelectBreakpoint />
    <SelectBreakpoint color="blue" fontSize={16} />
    <SelectBreakpoint style={{ marginHorizontal: 40 }} />
  </View>
)`}</Code>
        <NextPage name="Styled API" href="/styled" />
      </ContentGrid>
      <Footer />
    </>
  )
}
