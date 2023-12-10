import React, { useEffect, useRef } from 'react'
import { View, TouchableOpacity, Text, Animated, Easing, ViewProps } from 'react-native'
import { useResponsive, getBreakpoints, Styled, getValue, Breakpoints } from './index'

const Wrapper = Styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  height: 24,
})

const Button = Styled(TouchableOpacity, {
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  height: '100%',
})

const Cursor = Styled(Animated.View, {
  position: 'absolute',
  height: '100%',
  borderRadius: 10,
})

const getPosition = (index: number, length: number) => (100 / length) * index // (index + 1) * 20 + index * 60 - 5
const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

const textStyle = (active: boolean, index: number, fontSize: number) => {
  return {
    fontSize: getValue(fontSize + index * 2),
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
  onChange?: (value: keyof Breakpoints) => void
  waitForAnimation?: boolean
  color?: string
  fontSize?: number
  labels?: { [key: string]: string }
}

export const SelectBreakpoint = ({
  onChange,
  waitForAnimation = false,
  color = 'red',
  fontSize = 12,
  labels = {},
  ...props
}: Props & ViewProps) => {
  const breakpoints = getBreakpoints()
  const breakpointKeys = Object.keys(breakpoints) as (keyof Breakpoints)[]
  const { breakpoint, setBreakpoint } = useResponsive()
  const currentIndex = Object.keys(breakpoints).findIndex(
    (current) => current === String(breakpoint),
  )
  const breakpointCount = Object.keys(breakpoints).length
  const currentPosition = getPosition(currentIndex, breakpointCount)
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
      <Cursor
        style={[
          { backgroundColor: color, width: `${100 / breakpointCount}%` },
          { left: animatedPosition },
        ]}
      />
      {breakpointKeys.map((key, index) => (
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
              waitForAnimation ? 300 : 0,
            )
          }}
        >
          <Text style={textStyle(key === breakpoint, index, fontSize)}>
            {labels[key] ?? capitalizeFirstLetter(key)}
          </Text>
        </Button>
      ))}
    </Wrapper>
  )
}
