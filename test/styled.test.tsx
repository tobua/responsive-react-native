import React, { useState } from 'react'
import { View } from 'react-native'
import { act, render, screen } from '@testing-library/react-native'
import { updateBreakpoint, Styled, rerender } from 'responsive-react-native'
import { setWidth } from './helper/general'

const setNativePropsMock = new View({}).setNativeProps as jest.Mock

const CustomView = Styled(
  'View',
  {
    width: 40,
    height: 20,
    paddingLeft: 10,
    backgroundColor: 'green',
  },
  {
    small: {
      backgroundColor: 'red',
    },
    large: {
      backgroundColor: 'blue',
    },
    active: {
      backgroundColor: 'lightblue',
    },
    spaced: {
      paddingLeft: 40,
    },
  }
)

test('Styled component initially renders correct styles.', () => {
  setWidth(420)
  updateBreakpoint()

  render(<CustomView accessibilityLabel="custom-view" />)

  let view = screen.getByLabelText('custom-view')

  expect(view.props.style.backgroundColor).toBe('green')
  expect(view.props.style.width).toBe(40)
  expect(view.props.style.height).toBe(20)
  expect(view.props.style.paddingLeft).toBe(10)

  setWidth(320)
  updateBreakpoint()

  render(<CustomView accessibilityLabel="custom-view" />)

  view = screen.getByLabelText('custom-view')

  expect(view.props.style.backgroundColor).toBe('red')
  expect(view.props.style.width).toBe(30)
  expect(view.props.style.height).toBe(15)
  expect(view.props.style.paddingLeft).toBe(8)

  setWidth(640)
  updateBreakpoint()

  render(<CustomView accessibilityLabel="custom-view" />)

  view = screen.getByLabelText('custom-view')

  expect(view.props.style.backgroundColor).toBe('blue')
  expect(view.props.style.width).toBe(50)
  expect(view.props.style.height).toBe(25)
  expect(view.props.style.paddingLeft).toBe(13)
})

test('Styles are properly updated without the need for a rerender.', () => {
  setWidth(420)
  updateBreakpoint()

  render(<CustomView accessibilityLabel="custom-view" />)

  let view = screen.getByLabelText('custom-view')

  expect(view.props.style.backgroundColor).toBe('green')
  expect(view.props.style.width).toBe(40)
  expect(view.props.style.height).toBe(20)
  expect(view.props.style.paddingLeft).toBe(10)

  setWidth(320)
  updateBreakpoint()
  rerender()

  expect(setNativePropsMock.mock.calls.length).toBe(1)

  let styles = setNativePropsMock.mock.calls[0][0]

  expect(styles.style.backgroundColor).toBe('red')
  expect(styles.style.width).toBe(30)
  expect(styles.style.height).toBe(15)
  expect(styles.style.paddingLeft).toBe(8)

  setWidth(640)
  updateBreakpoint()
  rerender()

  expect(setNativePropsMock.mock.calls.length).toBe(2)

  styles = setNativePropsMock.mock.calls[1][0]

  expect(styles.style.backgroundColor).toBe('blue')
  expect(styles.style.width).toBe(50)
  expect(styles.style.height).toBe(25)
  expect(styles.style.paddingLeft).toBe(13)
})

test('Prop values and changes are propaged to matching styles.', () => {
  setWidth(420)
  updateBreakpoint()

  let onSpaced = (value: boolean) => console.log(value)

  const App = () => {
    const [spaced, setSpaced] = useState(false)

    onSpaced = setSpaced

    return <CustomView active spaced={spaced} accessibilityLabel="custom-view" />
  }

  render(<App />)

  let view = screen.getByLabelText('custom-view')

  expect(view.props.style.backgroundColor).toBe('lightblue')
  expect(view.props.style.paddingLeft).toBe(10)

  act(() => {
    onSpaced(true)
  })

  view = screen.getByLabelText('custom-view')

  expect(view.props.style.backgroundColor).toBe('lightblue')
  expect(view.props.style.paddingLeft).toBe(40)
})

test(`Multiple instances of the same Styled component don't affect each other.`, () => {
  setWidth(420)
  updateBreakpoint()

  let onSpaced = (value: boolean) => console.log(value)

  const App = () => {
    const [spaced, setSpaced] = useState(false)

    onSpaced = setSpaced

    return (
      <>
        <CustomView active spaced={!spaced} accessibilityLabel="custom-view-1" />
        <CustomView active={false} spaced={spaced} accessibilityLabel="custom-view-2" />
      </>
    )
  }

  render(<App />)

  let firstView = screen.getByLabelText('custom-view-1')
  let secondView = screen.getByLabelText('custom-view-2')

  expect(firstView.props.style.backgroundColor).toBe('lightblue')
  expect(firstView.props.style.paddingLeft).toBe(40)

  expect(secondView.props.style.backgroundColor).toBe('green')
  expect(secondView.props.style.paddingLeft).toBe(10)

  act(() => {
    onSpaced(true)
  })

  firstView = screen.getByLabelText('custom-view-1')
  secondView = screen.getByLabelText('custom-view-2')

  expect(firstView.props.style.backgroundColor).toBe('lightblue')
  expect(firstView.props.style.paddingLeft).toBe(10)

  expect(secondView.props.style.backgroundColor).toBe('green')
  expect(secondView.props.style.paddingLeft).toBe(40)
})
