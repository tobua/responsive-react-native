import { styled, theme } from '../stitches.config'
import { ContentGrid } from './General'
import * as Icon from './Icon'
import { Code } from './Code'
import Image from 'next/image'

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.space.large,
  alignItems: 'center',
  marginBottom: theme.space.huge,
  '@phone': {
    gridTemplateColumns: '1fr',
  },
})

const Left = styled('div', {
  gridColumn: '1 / 2',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  '@phone': {
    gridColumn: 'initial',
  },
  variants: {
    position: {
      center: {
        justifyContent: 'center',
      },
    },
  },
})

const Right = styled('div', {
  gridColumn: '2 / 3',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
  '@phone': {
    gridColumn: 'initial',
  },
  variants: {
    position: {
      center: {
        justifyContent: 'center',
      },
    },
  },
})

const Heading = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.medium,
  marginBottom: theme.space.large,
})

const Title = styled('div', {
  fontSize: 24,
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
})

const Description = styled('div', {
  fontFamily: 'sans-serif',
  fontSize: '16px',
  lineHeight: '24px',
})

const InlineCode = styled('span', {
  backgroundColor: '#EFEFEF',
  fontFamily: 'monospace',
  padding: 2,
  borderRadius: 3,
})

export const ResponsiveStyleSheet = () => {
  return (
    <ContentGrid>
      <Grid>
        <Left>
          <Heading>
            <Icon.Stylesheet size={40} color="black" />
            <Title>Responsive StyleSheet</Title>
          </Heading>
          <Description>
            By default the <InlineCode>createStyles</InlineCode> method can replace any call to the
            default React Native <InlineCode>StyleSheet.create</InlineCode>.
          </Description>
        </Left>
        <Right>
          <Code backgroundColor="#EFEFEF">{`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    width: 200,
    padding: 10,
  },
})

export default () => <View style={styles.view} />`}</Code>
        </Right>
      </Grid>
    </ContentGrid>
  )
}

export const ScaledValues = () => {
  return (
    <ContentGrid>
      <Grid>
        <Left position="center">
          <Code backgroundColor="#EFEFEF">{`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    width: 200,
    // =>
    // 200px at 420px viewport.
    // 150px at 320px viewport.
    // 250px at 520px viewport.
    padding: 10,
    flex: 1 // Unscaleable property, will be ignored.
  },
})

export default () => <View style={styles.view} />`}</Code>
        </Left>
        <Right>
          <Heading>
            <Icon.ScaledValues size={40} color="black" />
            <Title>Scaled Values</Title>
          </Heading>
          <Description>
            Any size property will be linearly scaled depending on the current viewport size.
          </Description>
          <div style={{ height: 300, position: 'relative' }}>
            <Image
              fill
              src="/scale.svg"
              sizes="(max-width: 500px) 100vw, 50vw"
              alt="Illustration of responsive scaling."
            />
          </div>
        </Right>
      </Grid>
    </ContentGrid>
  )
}

export const AdaptiveValues = () => {
  return (
    <ContentGrid>
      <Grid>
        <Left>
          <Heading>
            <Icon.AdaptiveValues size={40} color="black" />
            <Title>Adaptive Values</Title>
          </Heading>
          <Description>
            Using a special syntax different values can be used depending on breakpoint, orientation
            or platform. All (??) values will still be scaled to match the current viewport size.
          </Description>
          <ul>
            <li>
              <Description>
                Breakpoint: <InlineCode>{`{ [breakpoint]: value }`}</InlineCode>
              </Description>
            </li>
            <li>
              <Description>
                Orientation: <InlineCode>[portrait, landscale]</InlineCode>
              </Description>
            </li>
            <li>
              <Description>
                Platform: <InlineCode>{`{ ios: value, android: value }`}</InlineCode>
              </Description>
            </li>
          </ul>
        </Left>
        <Right>
          <Code backgroundColor="#EFEFEF">{`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    // Value for current breakpoint will be used.
    width: { small: 10, medium: 20, large: 30 },
    // Orientation will decide value [portrait, landscape].
    padding: [10, 20],
    // Platform can also be used as object key.
    height: { ios: 20, android: 40 }
  },
})

export default () => <View style={styles.view} />`}</Code>
        </Right>
      </Grid>
    </ContentGrid>
  )
}

export const Breakpoints = () => {
  return (
    <ContentGrid>
      <Grid>
        <Left>
          <Code backgroundColor="#EFEFEF">{`import { useResponsive } from 'responsive-react-native'

export default () => {
  const { breakpoint, orientation } = useResponsive()

  if (breakpoint === 'small') {
    return null
  }
  
  return (
    <View style={styles.view} />
  )
}`}</Code>
        </Left>
        <Right>
          <Heading>
            <Icon.Breakpoints size={40} color="black" />
            <Title>Breakpoints</Title>
          </Heading>
          <Description>
            In addition to picking values based on breakpoint the current breakpoint can also be
            accessed to dynamically render specific content. In addition to the default{' '}
            <InlineCode>small</InlineCode>, <InlineCode>medium</InlineCode> and{' '}
            <InlineCode>large</InlineCode> breakpoint other breakpoints can be configured.
          </Description>
        </Right>
      </Grid>
    </ContentGrid>
  )
}
