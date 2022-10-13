import React from 'react'
import { View, Text, Platform } from 'react-native'
import { render, screen, act } from '@testing-library/react-native'
import {
  createStyles,
  Rerender,
  setBreakpoint,
  rerender,
  getBreakpoint,
  getOrientation,
  updateBreakpoint,
  reset,
  useResponsive,
} from 'responsive-react-native'
import { setWidth } from './helper/general'

beforeEach(reset)

const styles = createStyles({
  wrapper: { backgroundColor: 'red', margin: 10, flex: 1 },
  text: { fontSize: 20, borderWidth: 40 },
})

test('Dynamic values are scaled depending on viewport size.', () => {
  render(
    <Rerender>
      {() => (
        <>
          <View accessibilityLabel="view" style={styles.wrapper} />
          <Text accessibilityLabel="text" style={styles.text} />
        </>
      )}
    </Rerender>
  )

  let view = screen.getByLabelText('view')
  let text = screen.getByLabelText('text')

  expect(view.props.style.backgroundColor).toBe('red')
  expect(view.props.style.margin).toBe(10)
  expect(view.props.style.flex).toBe(1)
  expect(text.props.style.fontSize).toBe(20)
  expect(text.props.style.borderWidth).toBe(40)

  setWidth(320)

  act(() => {
    rerender()
  })

  view = screen.getByLabelText('view')
  text = screen.getByLabelText('text')

  expect(view.props.style.margin).toBe(8)
  expect(view.props.style.flex).toBe(1)
  expect(text.props.style.fontSize).toBe(15)
  expect(text.props.style.borderWidth).toBe(30)

  setWidth(640)

  act(() => {
    rerender()
  })

  view = screen.getByLabelText('view')
  text = screen.getByLabelText('text')

  expect(view.props.style.margin).toBe(13)
  expect(view.props.style.flex).toBe(1)
  expect(text.props.style.fontSize).toBe(25)
  expect(text.props.style.borderWidth).toBe(50)
})

test('Breakpoints changes are reflected during render.', () => {
  setWidth(380)
  updateBreakpoint()

  const BreakpointText = () => <Text accessibilityLabel="breakpoint">{getBreakpoint()}</Text>

  render(<Rerender>{() => <BreakpointText />}</Rerender>)

  let breakpoint = screen.getByLabelText('breakpoint')

  expect(breakpoint.props.children).toBe('medium')

  act(() => {
    setBreakpoint('small')
  })

  breakpoint = screen.getByLabelText('breakpoint')

  expect(breakpoint.props.children).toBe('small')

  act(() => {
    setBreakpoint('large')
  })

  breakpoint = screen.getByLabelText('breakpoint')

  expect(breakpoint.props.children).toBe('large')
})

test('Breakpoints changes due to viewport change are reflected.', () => {
  setWidth(400)
  updateBreakpoint()

  const BreakpointText = () => <Text accessibilityLabel="breakpoint">{getBreakpoint()}</Text>

  render(<Rerender>{() => <BreakpointText />}</Rerender>)

  let breakpoint = screen.getByLabelText('breakpoint')

  expect(breakpoint.props.children).toBe('medium')

  setWidth(300)
  updateBreakpoint()

  act(() => {
    rerender()
  })

  breakpoint = screen.getByLabelText('breakpoint')

  expect(breakpoint.props.children).toBe('small')

  setWidth(900)
  updateBreakpoint()

  act(() => {
    rerender()
  })

  breakpoint = screen.getByLabelText('breakpoint')

  expect(breakpoint.props.children).toBe('large')
})

test('Various breakpoints are correctly calculated from width.', () => {
  setWidth(300)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('small')

  setWidth(360)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('small')

  setWidth(361)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('medium')

  setWidth(420)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('medium')

  setWidth(421)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('large')

  setWidth(500)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('large')

  setWidth(1000)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('large')
})

test('Can scale and support object based responsive values.', () => {
  setWidth(300)

  const shadowStyles = createStyles({
    shadow: {
      shadowRadius: 8,
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 1,
      shadowColor: 'black',
    },
  })

  expect(shadowStyles.shadow.shadowRadius).toBe(6)
  expect(shadowStyles.shadow.shadowOpacity).toBe(1)
  expect(shadowStyles.shadow.shadowColor).toBe('black')
  expect(shadowStyles.shadow.shadowOffset.width).toBe(4)
  expect(shadowStyles.shadow.shadowOffset.height).toBe(4)
})

test('useResponsive hook can be used to rerender on breakpoint changes and set breakpoint.', () => {
  setWidth(420)
  updateBreakpoint()

  let onBreakpoint = (value: string) => console.log(value)

  const App = () => {
    const { breakpoint, setBreakpoint: setBreakpointLocal } = useResponsive()
    onBreakpoint = setBreakpointLocal
    return <Text accessibilityLabel="text">{breakpoint}</Text>
  }

  render(<App />)

  let text = screen.getByLabelText('text')

  expect(text.children[0]).toBe('medium')

  setWidth(520)
  updateBreakpoint()
  act(() => {
    rerender()
  })

  text = screen.getByLabelText('text')

  expect(text.children[0]).toBe('large')

  act(() => {
    onBreakpoint('small')
  })

  text = screen.getByLabelText('text')

  expect(text.children[0]).toBe('small')
})

test('useResponsive hook contains correct orientation.', () => {
  setWidth(420)
  updateBreakpoint()

  const App = () => {
    const { orientation } = useResponsive()
    return <Text accessibilityLabel="text">{orientation}</Text>
  }

  render(<App />)

  let text = screen.getByLabelText('text')

  expect(text.children[0]).toBe('portrait')

  // Width > Height
  setWidth(1000)
  updateBreakpoint()
  act(() => {
    rerender()
  })

  text = screen.getByLabelText('text')

  expect(text.children[0]).toBe('landscape')
})

test('Selects different values based on current orientation.', () => {
  setWidth(300)

  expect(getOrientation()).toBe('portrait')

  const orientationStyles = createStyles({
    orientation: {
      width: [10, 20],
    },
  })

  expect(orientationStyles.orientation.width).toBe(10)

  setWidth(900)

  expect(getOrientation()).toBe('landscape')

  expect(orientationStyles.orientation.width).toBe(20)
})

test('Selects different values based on current breakpoint.', () => {
  setWidth(300)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('small')

  const breakpointStyles = createStyles({
    breakpoint: {
      width: { small: 10, medium: 20, large: 30 },
    },
  })

  expect(breakpointStyles.breakpoint.width).toBe(10)

  setWidth(400)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('medium')

  expect(breakpointStyles.breakpoint.width).toBe(20)

  setWidth(500)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('large')

  expect(breakpointStyles.breakpoint.width).toBe(30)
})

test('Missing breakpoints default to lower breakpoint.', () => {
  setWidth(400)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('medium')

  const breakpointStyles = createStyles({
    breakpoint: {
      width: { small: 10, large: 30 },
    },
  })

  expect(breakpointStyles.breakpoint.width).toBe(10)

  setWidth(500)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('large')

  expect(breakpointStyles.breakpoint.width).toBe(30)
})

test('Breakpoints and orientation can be combined.', () => {
  setWidth(400)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('medium')
  expect(getOrientation()).toBe('portrait')

  const breakpointStyles = createStyles({
    breakpoint: {
      width: { small: [10, 20], large: [30, 60] },
      height: [{ small: 5, medium: 10 }, { small: 8 }],
    },
  })

  expect(breakpointStyles.breakpoint.width).toBe(10)
  expect(breakpointStyles.breakpoint.height).toBe(10)

  setWidth(900)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('large')
  expect(getOrientation()).toBe('landscape')

  expect(breakpointStyles.breakpoint.width).toBe(60)
  expect(breakpointStyles.breakpoint.height).toBe(8)
})

test('Breakpoints and orientation also work with non-numeric values.', () => {
  setWidth(400)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('medium')
  expect(getOrientation()).toBe('portrait')

  const breakpointStyles = createStyles({
    breakpoint: {
      color: { small: ['blue', 'red'], large: ['green', 'yellow'] },
      backgroundColor: [{ small: 'blue', medium: 'red' }, { small: 'green' }],
    },
  })

  expect(breakpointStyles.breakpoint.color).toBe('blue')
  expect(breakpointStyles.breakpoint.backgroundColor).toBe('red')

  setWidth(900)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('large')
  expect(getOrientation()).toBe('landscape')

  expect(breakpointStyles.breakpoint.color).toBe('yellow')
  expect(breakpointStyles.breakpoint.backgroundColor).toBe('green')
})

test('Array and object based styles still work as expected.', () => {
  setWidth(400)
  updateBreakpoint()

  const breakpointStyles = createStyles({
    regular: {
      transform: [{ rotate: '45deg' }],
    },
  })

  expect(breakpointStyles.regular.transform).toEqual([{ rotate: '45deg' }])
})

test('Selects different values based on current platform.', () => {
  setWidth(300)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('small')

  const breakpointStyles = createStyles({
    breakpoint: {
      width: { android: 10, ios: 20 },
    },
  })

  expect(breakpointStyles.breakpoint.width).toBe(15)

  setWidth(420)
  updateBreakpoint()

  expect(getBreakpoint()).toBe('medium')

  expect(breakpointStyles.breakpoint.width).toBe(20)

  Platform.OS = 'android'

  expect(breakpointStyles.breakpoint.width).toBe(10)

  Platform.OS = 'ios'
})
