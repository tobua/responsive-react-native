import React from 'react'
import { View } from 'react-native'
import { act, render, screen } from '@testing-library/react-native'
import { updateBreakpoint, Styled, rerender } from 'responsive-react-native'
import { observable, runInAction } from 'mobx'
import { setWidth } from './helper/general'

const setNativePropsMock = new View({}).setNativeProps as jest.Mock

const Store = observable({
  active: true,
  spaced: false,
})

const ObservableView = Styled(
  'View',
  () => ({
    width: 40,
    height: 20,
    paddingLeft: Store.spaced ? 40 : 10,
    backgroundColor: Store.active ? 'lightblue' : 'green',
  }),
  () => ({
    small: {
      backgroundColor: Store.active ? 'yellow' : 'red',
    },
    large: {
      backgroundColor: 'blue',
    },
  }),
)

test('Prop values and changes are propaged to matching styles.', () => {
  setWidth(420)
  updateBreakpoint()

  render(<ObservableView accessibilityLabel="observable-view" />)

  const view = screen.getByLabelText('observable-view')

  expect(view.props.style.backgroundColor).toBe('lightblue')
  expect(view.props.style.paddingLeft).toBe(10)

  act(() => {
    runInAction(() => {
      Store.spaced = !Store.spaced
      Store.active = !Store.active
    })
  })

  expect(setNativePropsMock.mock.calls.length).toBe(1)

  let styles = setNativePropsMock.mock.calls[0][0]

  expect(styles.style.backgroundColor).toBe('green')
  expect(styles.style.paddingLeft).toBe(40)

  setWidth(720)
  updateBreakpoint()

  act(() => {
    rerender()
  })

  expect(setNativePropsMock.mock.calls.length).toBe(2)

  styles = setNativePropsMock.mock.calls[1][0]

  expect(styles.style.backgroundColor).toBe('blue')
  expect(styles.style.paddingLeft).toBe(50)
})

test('Style method also receives props.', () => {
  const ObservableWithPropsView = Styled(
    'View',
    (props: { space: number }) => ({
      paddingLeft: props.space,
      marginLeft: props.space,
    }),
    (props: { space: number }) => ({
      medium: {
        paddingLeft: props.space * 2,
      },
    }),
  )

  setWidth(420)
  updateBreakpoint()

  render(<ObservableWithPropsView space={20} accessibilityLabel="observable-view" />)

  const view = screen.getByLabelText('observable-view')

  expect(view.props.style.paddingLeft).toBe(40)
  expect(view.props.style.marginLeft).toBe(20)
})
