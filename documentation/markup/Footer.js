import { styled, theme } from '../stitches.config'
import { Link } from './Link'

const Text = styled('p', {
  fontFamily: 'sans-serif',
  color: 'black',
  fontWeight: 'bold',
})

const Wrapper = styled('footer', {
  display: 'flex',
  marginTop: theme.space.huge,
  marginBottom: theme.space.huge,
})

const Column = styled('div', {
  display: 'flex',
  flexBasis: '25%',
  alignItems: 'flex-start', // Avoid stretching links to keep gradient for text width.
  flexDirection: 'column',
  gap: theme.space.small,
})

export const Footer = () => {
  return (
    <Wrapper>
      <Column>
        <Text>Documentation</Text>
        <Link href="/getting-started">Getting Started</Link>
        <Link href="/features">Features</Link>
        <Link href="/styled">Styled API</Link>
        <Link href="/configuration">Configuration</Link>
      </Column>
      <Column>
        <Text>Links</Text>
        <Link href="https://github.com/tobua/responsive-react-native">GitHub</Link>
        <Link href="https://npmjs.com/responsive-react-native">npm</Link>
      </Column>
    </Wrapper>
  )
}
