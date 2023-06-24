import Head from 'next/head'
import Image from 'next/image'
import { theme } from '../stitches.config'
import { Footer } from '../markup/Footer'
import { Code } from '../markup/Code'
import { Layout } from '../markup/Layout'
import { Anchor } from '../markup/Link'
import { ContentGrid, InlineCode, Text, Title } from '../markup/General'

export default function Configuration() {
  return (
    <>
      <Head>
        <title>Configuration - Responsive React Native</title>
      </Head>
      <Layout>Configuration</Layout>
      <ContentGrid>
        <Text>
          While the defaults should work fine to get started it's also possible to configure almost
          any behaviour.
        </Text>
        <Anchor id="breakpoint">
          <Title>Breakpoints</Title>
        </Anchor>
        <Text>
          By default small, medium and large breakpoints are available. The number of breakpoints,
          their names as well as the starting point can all be changed. The number defines the
          minimal viewport width where this breakpoint will apply. By default the initial breakpoint
          is inferred from the viewport size, but can also be configured.
        </Text>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`import { configure } from 'responsive-react-native'

configure({
  // Available breakpoints, default { small: 360, medium: 420, large: 999 }.
  breakpoints: {
    tiny: 300,
    normal: 600,
    huge: 800,
  },
  // Initial breakpoint, default inferred from breakpoint values.
  breakpoint: 'small'
})`}</Code>
        <Text>
          When configuring breakpoints with TypeScript use the following to override{' '}
          <InlineCode>Breakpoint</InlineCode> types for proper type checking.
        </Text>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`declare module 'responsive-react-native' {
  interface Breakpoints {
    tiny: number
    normal: number
    huge: number
  }
}`}</Code>
        <Anchor id="scaled-values">
          <Title>Scaled Values</Title>
        </Anchor>
        <Text>
          Regular pixel based values will not be adapted based on breakpoints, but linearly scaled
          between a minimum and a maximum breakpoint. In the middle between these two points the
          value will not scale at all. By specifying the <InlineCode>factor</InlineCode> the
          strength of the scaling can be defined.
        </Text>
        <div style={{ height: 300, position: 'relative' }}>
          <Image fill src="/scale.svg" alt="Illustration of responsive scaling." />
        </div>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`import { configure } from 'responsive-react-native'

configure({
  // Responsive scaling configuration, default { minimum: 320, maximum: 520, factor: 0.5 }.
  scale: {
    minimum: 300,
    maximum: 600,
    factor: 1,
  },
})`}</Code>
        <Text>
          For even more fine grained control it's possible to override the default scaling function.
          This method called <InlineCode>value</InlineCode> will receive the number of the property.
          This would be 10 in the case of <InlineCode>{`{ padding: 10 }`}</InlineCode>.
          Additionally, the method will receive the current breakpoint. As shown below with this
          it's easily possible to calculate the value based on the breakpoint instead of scaling
          linearly.
        </Text>
        <Code
          backgroundColor={theme.color.codeBackground}
        >{`import { configure } from 'responsive-react-native'

configure({
  // Method used to calculate responsive values, default linear scaling according to "scale" configuration.
  value: (value: number, breakpoint: string, orientation: 'portrait' | 'landscape') => {
    if (breakpoint === 'medium') {
      return value
    }

    const halfValue = Math.round(value / 6)

    if (breakpoint === 'small') {
      return value - halfValue
    }

    return value + halfValue
  },
})`}</Code>
      </ContentGrid>
      <Footer />
    </>
  )
}
