import { styled, theme } from '../stitches.config'

const Wrapper = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 30,
  variants: {
    position: {
      left: {
        justifyContent: 'flex-start',
      },
      right: {
        justifyContent: 'flex-end',
      },
      top: {
        alignItems: 'flex-start',
      },
    },
  },
})

const Camera = styled('div', {
  width: 10,
  height: 10,
  backgroundColor: 'black',
  borderRadius: 10,
})

const Notch = styled('div', {
  width: '60%',
  height: '80%',
  backgroundColor: 'black',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
})

export const PhoneCutout = ({ type }) => {
  if (type === 'notch') {
    return (
      <Wrapper position="top">
        <Notch />
      </Wrapper>
    )
  }

  return (
    <Wrapper position={type}>
      <Camera />
    </Wrapper>
  )
}
