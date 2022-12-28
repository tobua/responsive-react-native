import React, { useEffect, useRef } from 'react'
import { View, TouchableOpacity, Text, Animated, Easing, ViewProps } from 'react-native'
import { useResponsive, getBreakpoints, Styled, getValue } from './index'

const Wrapper = Styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: { small: 20 },
})

const Button = Styled(TouchableOpacity, {
  marginHorizontal: 20,
  alignItems: 'center',
  flex: 1,
})

const Cursor = Styled(Animated.View, {
  position: 'absolute',
  width: '33.3%',
  height: '100%',
  borderRadius: 10,
})

const getPosition = (index: number, length: number) => (100 / length) * index // (index + 1) * 20 + index * 60 - 5
const getFontSize = (index: number) => 12 + index * 2
const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

const textStyle = (active: boolean, index: number) => {
  return {
    fontSize: getValue(getFontSize(index)),
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
  color?: string
} & ViewProps

export const SelectBreakpoint = ({
  onChange,
  waitForAnimation = false,
  color = 'red',
  ...props
}: Props) => {
  const breakpoints = getBreakpoints()
  const { breakpoint, setBreakpoint } = useResponsive()
  const currentIndex = Object.keys(breakpoints).findIndex(
    (current) => current === String(breakpoint)
  )
  const currentPosition = getPosition(currentIndex, Object.keys(breakpoints).length)
  const position = useRef(new Animated.Value(currentPosition)).current
  const animatedPosition = position.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  })

  useEffect(() => {
    // Trigger animation if breakpoint is changed from outside.
    // @ts-ignore
    if (position._value !== currentPosition) {
      animate(position, currentPosition)
    }
  }, [breakpoint, currentPosition, position])

  return (
    <Wrapper {...props}>
      <Cursor style={[{ backgroundColor: color }, { left: animatedPosition }]} />
      {Object.keys(breakpoints).map((key, index) => (
        <Button
          key={key}
          onPress={() => {
            animate(position, getPosition(index, Object.keys(breakpoints).length))

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
        </Button>
      ))}
    </Wrapper>
  )
}
