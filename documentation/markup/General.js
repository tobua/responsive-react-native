import { styled, theme } from '../stitches.config'

export const Center = styled('div', {
  display: 'flex',
  justifyContent: 'center',
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  maxWidth: 1000,
  paddingLeft: theme.space.medium,
  paddingRight: theme.space.medium,
  gap: theme.space.medium,
  variants: {
    size: {
      wide: {
        maxWidth: 1200,
      },
      ultrawide: {
        maxWidth: 1400,
      },
    },
  },
})

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
