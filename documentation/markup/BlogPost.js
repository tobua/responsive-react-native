import Image from 'next/image'
import { ContentGrid } from './General'
import { styled, theme } from '../stitches.config'

const Wrapper = styled('a', {
  display: 'flex',
  gap: theme.space.large,
  textDecoration: 'none',
  color: 'black',
  marginTop: theme.space.large,
})

const Blockquote = styled('blockquote', {
  fontFamily: 'sans-serif',
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.small,
  margin: 0,
  marginBottom: theme.space.small,
})

const Cite = styled('cite', {
  fontFamily: 'sans-serif',
})

const Quote = styled('span', {
  fontFamily: 'sans-serif',
  fontSize: 28,
  fontWeight: 'bold',
  color: theme.color.highlight,
})

export const BlogPost = () => {
  return (
    <ContentGrid css={{ justifyContent: 'center' }}>
      <Wrapper href="https://onwebfocus.com/styled">
        <Image width={80} height={80} src="/onwebfocus.png" alt="Article in onbwefocus.com blog." />
        <div>
          <Blockquote cite="https://onwebfocus.com/styled">
            <Quote>"</Quote>This plugin however goes much further while still being simpler.
            <Quote>"</Quote>
          </Blockquote>
          <Cite>onwebfocus.com Blog</Cite>
        </div>
      </Wrapper>
    </ContentGrid>
  )
}
