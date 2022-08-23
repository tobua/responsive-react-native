import React from 'react'
import { View, StyleSheet } from 'react-native'
import { render, screen } from '@testing-library/react-native'
import { createStyles, Rerender } from 'responsive-react-native'
import { setWidth } from './helper/general'

test('Can refactor an existing application by overriding StyleSheet.create.', () => {
  setWidth(300)
  Object.assign(StyleSheet, { create: createStyles })

  const styles = StyleSheet.create({
    wrapper: { backgroundColor: 'red', margin: 10, flex: 1 },
  })

  expect(StyleSheet.create === createStyles).toBe(true)

  render(<Rerender>{() => <View accessibilityLabel="view" style={styles.wrapper} />}</Rerender>)

  let view = screen.getByLabelText('view')

  expect(view.props.style.backgroundColor).toBe('red')
  expect(view.props.style.margin).toBe(8)
  expect(view.props.style.flex).toBe(1)

  setWidth(900)

  view = screen.getByLabelText('view')

  expect(view.props.style.backgroundColor).toBe('red')
  expect(view.props.style.margin).toBe(13)
  expect(view.props.style.flex).toBe(1)
})
