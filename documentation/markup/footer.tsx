import { go } from 'router'
import { styled, theme } from '../stitches.config'
import { ContentGrid } from './general'
import { Link } from './link'

const Text = styled('p', {
  fontFamily: 'sans-serif',
  color: 'black',
  fontWeight: 'bold',
})

const Wrapper = styled('footer', {
  display: 'flex',
  marginTop: theme.space.huge,
  marginBottom: theme.space.huge,
  gap: theme.space.medium,
})

const Column = styled('div', {
  display: 'flex',
  flexBasis: '25%',
  alignItems: 'flex-start', // Avoid stretching links to keep gradient for text width.
  flexDirection: 'column',
  gap: theme.space.small,
  '@tablet': {
    flexBasis: '50%',
  },
})

export const Footer = () => {
  return (
    <ContentGrid>
      <Wrapper>
        <Column>
          <Text>Documentation</Text>
          <Link onClick={(event) => go(event, 'getting-started')} href="/getting-started">
            Getting Started
          </Link>
          <Link onClick={(event) => go(event, 'features')} href="/features">
            Features
          </Link>
          <Link onClick={(event) => go(event, 'styled')} href="/styled">
            Styled API
          </Link>
          <Link onClick={(event) => go(event, 'configuration')} href="/configuration">
            Configuration
          </Link>
        </Column>
        <Column>
          <Text>Links</Text>
          <Link href="https://github.com/tobua/responsive-react-native">GitHub</Link>
          <Link href="https://npmjs.com/responsive-react-native">npm</Link>
        </Column>
      </Wrapper>
    </ContentGrid>
  )
}
