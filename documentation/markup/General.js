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
  variants: {
    size: {
      wide: {
        maxWidth: 1200,
      },
    },
  },
})
