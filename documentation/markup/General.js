import { styled, theme } from '../stitches.config'

const ContentGridWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: `minmax(${theme.space.medium}, 1fr) minmax(0, 1000px) minmax(${theme.space.medium}, 1fr)`,
  variants: {
    size: {
      wide: {
        gridTemplateColumns: 'minmax(20px, 1fr) minmax(0, 1200px) minmax(20px, 1fr)',
      },
      ultrawide: {
        gridTemplateColumns: 'minmax(20px, 1fr) minmax(0, 1400px) minmax(20px, 1fr)',
      },
    },
  },
})

const ContentGridCenter = styled('div', {
  display: 'grid',
  gridColumn: '2',
  gap: theme.space.medium,
})

export const ContentGrid = ({ children, css, size }) => (
  <ContentGridWrapper size={size}>
    <ContentGridCenter css={css}>{children}</ContentGridCenter>
  </ContentGridWrapper>
)

export const Title = styled('h2', {
  fontFamily: 'sans-serif',
  margin: 0,
})

export const Text = styled('p', {
  fontFamily: 'sans-serif',
  lineHeight: '130%',
  margin: 0,
})

export const InlineCode = styled('span', {
  fontFamily: 'monospace',
  fontSize: '110%',
  background: theme.color.codeBackground,
  padding: 2,
  borderRadius: 4,
})

export const Important = styled('span', {
  color: theme.color.highlight,
  fontWeight: 'bold',
})
