import { Camera } from 'device-sizes'
import { styled } from '../stitches.config'

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
      [Camera.Left]: {
        justifyContent: 'flex-start',
      },
      [Camera.Right]: {
        justifyContent: 'flex-end',
      },
      top: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
    },
  },
})

const Cutout = styled('div', {
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

const DynamicIsland = styled('div', {
  width: '20%',
  height: '60%',
  backgroundColor: 'black',
  borderRadius: 10,
})

export const PhoneCutout = ({ type }) => {
  if (type === Camera.Notch) {
    return (
      <Wrapper position="top">
        <Notch />
      </Wrapper>
    )
  }

  if (type === Camera.DynamicIsland) {
    return (
      <Wrapper position="center">
        <DynamicIsland />
      </Wrapper>
    )
  }

  return (
    <Wrapper position={type}>
      <Cutout />
    </Wrapper>
  )
}
