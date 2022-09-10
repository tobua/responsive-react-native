import React, { useCallback, useState, useRef } from 'react'
import { View, Animated, Easing } from 'react-native'
import { Styled } from 'responsive-react-native'

const Head = Styled('TouchableOpacity', {
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
})

const Title = Styled('Text', {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 6,
})

const Icon = Styled('Animated.View', {
  width: 22,
  height: 10,
})

const IconLeft = Styled('View', {
  position: 'absolute',
  top: 4,
  left: 0,
  width: 14,
  height: 3,
  borderRadius: 3,
  backgroundColor: 'black',
  transform: [{ rotate: '45deg' }],
})

const IconRight = Styled('View', {
  position: 'absolute',
  top: 4,
  right: 0,
  width: 14,
  height: 3,
  borderRadius: 3,
  backgroundColor: 'black',
  transform: [{ rotate: '135deg' }],
})

export function Expandable({ title, children, initiallyOpen = false }) {
  const [open, setOpen] = useState(initiallyOpen)
  const caretSpin = useRef(new Animated.Value(open ? 1 : 0)).current
  const contentOpacity = useRef(new Animated.Value(open ? 1 : 0)).current
  const toggleOpen = useCallback(() => {
    Animated.timing(caretSpin, {
      toValue: open ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
    Animated.timing(contentOpacity, {
      toValue: open ? 0 : 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
    setOpen(!open)
  }, [open, caretSpin, contentOpacity])

  const spin = caretSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const opacity = contentOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  return (
    <View>
      <Head onPress={toggleOpen}>
        <Title>{title}</Title>
        <Icon style={{ transform: [{ rotate: spin }] }}>
          <IconLeft />
          <IconRight />
        </Icon>
      </Head>
      <Animated.View style={{ opacity }}>{open && children}</Animated.View>
    </View>
  )
}
