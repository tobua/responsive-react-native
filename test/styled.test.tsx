import React, { useState } from 'react'
import { View, TouchableHighlight, Platform, Text, Animated, Image } from 'react-native'
import { act, render, screen } from '@testing-library/react-native'
import { updateBreakpoint, Styled, rerender, getBreakpoint, getOrientation, reset } from 'responsive-react-native'
import { setWidth, setWidthAndHeight } from './helper/general'

beforeEach(reset)

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
    ios: {
      margin: 5,
    },
    android: {
      margin: 15,
    },
  },
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

test('Also supports breakpoint and orientation values.', () => {
  const NestedView = Styled(
    'View',
    {
      width: { small: [40, 60], large: [80, 100] },
      height: [{ small: 10, medium: 20 }, { small: 30 }],
      paddingLeft: [20, 40],
      backgroundColor: ['green', 'blue'],
    },
    {
      small: {
        backgroundColor: ['red', 'yellow'],
      },
      large: {
        backgroundColor: ['pink', 'purple'],
      },
    },
  )

  setWidth(420)
  updateBreakpoint()

  render(<NestedView accessibilityLabel="nested-view" />)

  expect(getBreakpoint()).toBe('medium')
  expect(getOrientation()).toBe('portrait')

  let view = screen.getByLabelText('nested-view')

  expect(view.props.style.backgroundColor).toBe('green')
  expect(view.props.style.width).toBe(40)
  expect(view.props.style.height).toBe(20)
  expect(view.props.style.paddingLeft).toBe(20)

  setWidth(320)
  updateBreakpoint()

  render(<NestedView accessibilityLabel="nested-view" />)

  expect(getBreakpoint()).toBe('small')
  expect(getOrientation()).toBe('portrait')

  view = screen.getByLabelText('nested-view')

  expect(view.props.style.backgroundColor).toBe('red')
  expect(view.props.style.width).toBe(40)
  expect(view.props.style.height).toBe(8)
  expect(view.props.style.paddingLeft).toBe(15)

  setWidth(640)
  updateBreakpoint()

  render(<NestedView accessibilityLabel="nested-view" />)

  expect(getBreakpoint()).toBe('large')
  expect(getOrientation()).toBe('portrait')

  view = screen.getByLabelText('nested-view')

  expect(view.props.style.backgroundColor).toBe('pink')
  expect(view.props.style.width).toBe(80)
  expect(view.props.style.height).toBe(25)
  expect(view.props.style.paddingLeft).toBe(25)

  setWidth(900)
  updateBreakpoint()

  render(<NestedView accessibilityLabel="nested-view" />)

  expect(getBreakpoint()).toBe('large')
  expect(getOrientation()).toBe('landscape')

  view = screen.getByLabelText('nested-view')

  expect(view.props.style.backgroundColor).toBe('purple')
  expect(view.props.style.width).toBe(100)
  expect(view.props.style.height).toBe(38)
  expect(view.props.style.paddingLeft).toBe(50)

  setWidthAndHeight(320, 200)
  updateBreakpoint()

  render(<NestedView accessibilityLabel="nested-view" />)

  expect(getBreakpoint()).toBe('small')
  expect(getOrientation()).toBe('landscape')

  view = screen.getByLabelText('nested-view')

  expect(view.props.style.backgroundColor).toBe('yellow')
  expect(view.props.style.width).toBe(60)
  expect(view.props.style.height).toBe(23)
  expect(view.props.style.paddingLeft).toBe(30)

  setWidthAndHeight(420, 200)
  updateBreakpoint()

  render(<NestedView accessibilityLabel="nested-view" />)

  expect(getBreakpoint()).toBe('medium')
  expect(getOrientation()).toBe('landscape')

  view = screen.getByLabelText('nested-view')

  expect(view.props.style.backgroundColor).toBe('blue')
  expect(view.props.style.width).toBe(60)
  expect(view.props.style.height).toBe(30)
  expect(view.props.style.paddingLeft).toBe(40)
})

test('Nested values also work with props and after rerender.', () => {
  const CombinedView = Styled(
    'View',
    (props: any) => ({
      width: props.active ? { small: [40, 60], large: [80, 100] } : { small: 10, medium: [12, 14] },
      height: props.spaced ? [{ small: 10, medium: 20 }, { small: 30 }] : [40, 50],
      backgroundColor: ['green', 'blue'],
    }),
    (props: any) => ({
      small: {
        backgroundColor: props.spaced ? ['red', 'yellow'] : ['pink', 'purple'],
      },
      active: {
        backgroundColor: 'lightblue',
      },
      spaced: {
        paddingLeft: 40,
      },
    }),
  )

  setNativePropsMock.mockReset()

  setWidthAndHeight(420, 800)
  updateBreakpoint()

  let onSpaced = (value: boolean) => console.log(value)
  let onActive = (value: boolean) => console.log(value)

  const App = () => {
    const [spaced, setSpaced] = useState(false)
    const [active, setActive] = useState(true)

    onSpaced = setSpaced
    onActive = setActive

    return <CombinedView active={active} spaced={spaced} accessibilityLabel="combined-view" />
  }

  render(<App />)

  expect(getBreakpoint()).toBe('medium')
  expect(getOrientation()).toBe('portrait')

  let view = screen.getByLabelText('combined-view')

  expect(view.props.style.width).toBe(40)
  expect(view.props.style.height).toBe(40)
  expect(view.props.style.backgroundColor).toBe('lightblue')

  act(() => {
    onSpaced(true)
    onActive(false)
  })

  view = screen.getByLabelText('combined-view')

  expect(view.props.style.width).toBe(12)
  expect(view.props.style.height).toBe(20)
  expect(view.props.style.backgroundColor).toBe('green')

  setWidthAndHeight(320, 200)
  updateBreakpoint()
  act(() => {
    rerender()
  })

  expect(getBreakpoint()).toBe('small')
  expect(getOrientation()).toBe('landscape')

  expect(setNativePropsMock.mock.calls.length).toBe(1)

  const styles = setNativePropsMock.mock.calls[0][0]

  expect(styles.style.width).toBe(10)
  expect(styles.style.height).toBe(23)
  expect(styles.style.backgroundColor).toBe('yellow')
})

test('Constructor accepts various input methods for the component type.', () => {
  const RegularStringView = Styled('View', {})

  expect(typeof (<RegularStringView />)).toBe('object')
  expect(typeof (<RegularStringView />).type).toBe('function')
  expect((<RegularStringView testID="hello" />).props.testID).toBe('hello')

  const AnimatedNestedView = Styled('Animated.View', {})

  expect(typeof (<AnimatedNestedView />)).toBe('object')

  const ImageView = Styled('Image', {})

  expect(typeof (<ImageView />)).toBe('object')

  const TouchableOpacityView = Styled('TouchableOpacity', {})

  expect(typeof (<TouchableOpacityView />)).toBe('object')

  const TouchableHighlightView = Styled(TouchableHighlight, {})

  expect(typeof (<TouchableHighlightView />)).toBe('object')
})

test('Styles from regular props are merged in.', () => {
  const RegularView = Styled('View', {
    color: 'red',
  })

  render(<RegularView accessibilityLabel="regular-view" style={{ backgroundColor: 'blue' }} />)

  let view = screen.getByLabelText('regular-view')

  expect(view.props.style[0].backgroundColor).toBe('blue')
  expect(view.props.style[1].color).toBe('red')

  render(<RegularView accessibilityLabel="regular-view" style={[{ backgroundColor: 'blue' }]} />)

  view = screen.getByLabelText('regular-view')

  expect(view.props.style[0].backgroundColor).toBe('blue')
  expect(view.props.style[1].color).toBe('red')

  const AnimatedView = Styled(Animated.View, {
    color: 'red',
  })
  render(<AnimatedView accessibilityLabel="animated-view" style={{ backgroundColor: 'blue' }} />)

  view = screen.getByLabelText('animated-view')

  // Styles properties for animated views are automatically merged.
  expect(view.props.style.backgroundColor).toBe('blue')
  expect(view.props.style.color).toBe('red')
})

test('OS specific conditional styles can be used.', () => {
  setWidth(420)
  updateBreakpoint()

  render(<CustomView accessibilityLabel="custom-view" />)

  let view = screen.getByLabelText('custom-view')

  expect(view.props.style.margin).toBe(5)

  Platform.OS = 'android'

  render(<CustomView accessibilityLabel="custom-view" />)

  view = screen.getByLabelText('custom-view')

  expect(view.props.style.margin).toBe(15)

  Platform.OS = 'ios'
})

test('Types for StyleSheets passed to Styled are properly inferred.', () => {
  const TypedView = Styled(
    'View',
    {
      width: { small: 40, medium: 80 },
      height: {
        ios: 20,
        android: 40, // @ts-expect-error
        missing: 60,
      },
      paddingLeft: [10, 40],
      backgroundColor: 'green',
      // @ts-expect-error
      maxWidth: false,
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
      ios: {
        margin: 5,
      },
      android: {
        margin: 15,
      },
    },
  )

  expect(<TypedView active />).toBeDefined()
  expect(<TypedView accessibilityRole="button" testID="text" />).toBeDefined()
  // @ts-expect-error
  expect(<TypedView small />).toBeDefined()
  // @ts-expect-error
  expect(<TypedView missingProp />).toBeDefined()
  // @ts-expect-error
  expect(<TypedView userSelect="text" />).toBeDefined()

  const TypedText = Styled(Text, {
    display: 'flex',
  })

  expect(<TypedText>Hello World</TypedText>).toBeDefined()
  expect(
    <TypedText accessibilityRole="button" textBreakStrategy="simple" selectable>
      Hello World
    </TypedText>,
  ).toBeDefined()

  const TypedImage = Styled(
    Image,
    {
      height: 20,
      width: [20, 40],
    },
    {
      small: {
        // @ts-expect-error
        backgroundColor: 4,
      },
      active: {
        backgroundColor: 'lightblue',
        // @ts-expect-error
        paddingRight: true,
      },
      spaced: {
        paddingLeft: 40,
      },
      ios: {
        // @ts-expect-error
        margin: 'red',
      },
    },
  )

  // TODO no error when source missing...
  expect(<TypedImage style={{ backgroundColor: 'blue' }} />).toBeDefined()
  expect(<Image source={{ uri: 'required' }} />).toBeDefined()
})

test('Style method also receives props.', () => {
  type Props = { space: number; size?: number }
  const ObservableWithPropsView = Styled(
    'View',
    (props: Props) => ({
      paddingLeft: props.space,
      marginLeft: props.space,
      paddingTop: props.size,
    }),
    (props: Props) => ({
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

  render(
    <ObservableWithPropsView
      space={20}
      // @ts-expect-error
      size="error"
      accessibilityLabel="observable-view"
    />,
  )
})
