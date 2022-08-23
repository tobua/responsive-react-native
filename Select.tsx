import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing } from 'react-native'
import { getBreakpoint, setBreakpoint, getBreakpoints } from './index'

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

export const Select = () => {
  const breakpoints = getBreakpoints()
  const [size, setLocalSize] = React.useState(getBreakpoint())
  const position = React.useRef(
    new Animated.Value(
      getPosition(Object.keys(breakpoints).findIndex((current) => current === String(size)))
    )
  ).current

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.selected, { left: position }]} />
      {Object.keys(breakpoints).map((key, index) => (
        <TouchableOpacity
          key={key}
          style={styles.item}
          onPress={() => {
            animate(position, getPosition(index))
            setLocalSize(key)
            setBreakpoint(key)
          }}
        >
          <Text style={textStyle(key === size, index)}>{capitalizeFirstLetter(key)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
