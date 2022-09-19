import React, { useEffect, useRef } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing, ViewProps } from 'react-native'
import { useResponsive, getBreakpoints } from './index'

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    marginLeft: 20,
    alignItems: 'center',
    width: 60,
  },
  selected: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 70,
    height: '100%',
    borderRadius: 10,
  },
})

const getPosition = (index: number) => (index + 1) * 20 + index * 60 - 5
const getFontSize = (index: number) => 12 + index * 2
const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

const textStyle = (active: boolean, index: number) => {
  return {
    fontSize: getFontSize(index),
    color: active ? '#FFFFFF' : '#000000',
  }
}

const animate = (handle: Animated.Value, toValue: number) =>
  Animated.timing(handle, {
    toValue,
    easing: Easing.ease,
    useNativeDriver: false,
    duration: 300,
  }).start()

type Props = {
  onChange?: (value: string) => void
  waitForAnimation?: boolean
} & ViewProps

export const SelectBreakpoint = ({ onChange, waitForAnimation = false, ...props }: Props) => {
  const breakpoints = getBreakpoints()
  const { breakpoint, setBreakpoint } = useResponsive()
  const currentIndex = Object.keys(breakpoints).findIndex(
    (current) => current === String(breakpoint)
  )
  const currentPosition = getPosition(currentIndex)
  const position = useRef(new Animated.Value(currentPosition)).current

  useEffect(() => {
    // Trigger animation if breakpoint is changed from outside.
    // @ts-ignore
    if (position._value !== currentPosition) {
      animate(position, currentPosition)
    }
  }, [breakpoint, currentPosition, position])

  return (
    <View style={styles.wrapper} {...props}>
      <Animated.View style={[styles.selected, { left: position }]} />
      {Object.keys(breakpoints).map((key, index) => (
        <TouchableOpacity
          key={key}
          style={styles.item}
          onPress={() => {
            animate(position, getPosition(index))

            setTimeout(
              () => {
                setBreakpoint(key)

                if (onChange) {
                  onChange(key)
                }
              },
              waitForAnimation ? 300 : 0
            )
          }}
        >
          <Text style={textStyle(key === breakpoint, index)}>{capitalizeFirstLetter(key)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
