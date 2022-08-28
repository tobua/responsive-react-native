import React from 'react'
import { View, Text } from 'react-native'
import { render, screen, act } from '@testing-library/react-native'
import {
  createStyles,
  Rerender,
  setBreakpoint,
  rerender,
  getBreakpoint,
  updateBreakpoint,
  reset,
  useBreakpoint,
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

test('useBreakpoint hook can be used to rerender on breakpoint changes and set breakpoint.', () => {
  setWidth(420)
  updateBreakpoint()

  let onBreakpoint = (value: string) => console.log(value)

  const App = () => {
    const { breakpoint, setBreakpoint: setBreakpointLocal } = useBreakpoint()
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
