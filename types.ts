import { Component, ComponentType } from 'react'
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  ViewProps,
  TextProps,
  ImageProps,
  ButtonProps,
  TextInputProps,
  TouchableOpacityProps,
  Animated,
  View,
  PressableProps,
  ScrollViewProps,
} from 'react-native'

export interface Scale {
  minimum: number
  maximum: number
  factor: number
}

export interface Breakpoints {}

export interface DefaultBreakpoints {
  small: number
  medium: number
  large: number
}

export type CurrentBreakpoints = keyof Breakpoints extends never ? DefaultBreakpoints : Breakpoints

export type BreakpointKeys = (keyof CurrentBreakpoints)[]

export type Orientation = 'portrait' | 'landscape'

export type Value = (value: number, breakpoint: string, orientation: Orientation) => number

export type StyledComponent = string | string[] | Function | Component

export type NativeStyle = ViewStyle & TextStyle & ImageStyle

export type Platform = 'ios' | 'android'

export type PlatformStyleProp<T extends keyof NativeStyle, K extends Platform = Platform> = {
  [P in K]: NativeStyle[T] | MediaStyleProp<T> | OrientationStyleProp<T>
}

export type MediaStyleProp<
  T extends keyof NativeStyle,
  U extends keyof CurrentBreakpoints = keyof CurrentBreakpoints
> = {
  [K in U]?: NativeStyle[T] | PlatformStyleProp<T> | OrientationStyleProp<T>
}

export type OrientationStyleProp<T extends keyof NativeStyle> = [
  NativeStyle[T] | PlatformStyleProp<T> | MediaStyleProp<T>,
  NativeStyle[T] | PlatformStyleProp<T> | MediaStyleProp<T>
]

export type StyleProps<T extends keyof NativeStyle> = {
  [L in T]?: NativeStyle[L] | PlatformStyleProp<L> | MediaStyleProp<L> | OrientationStyleProp<L>
}

export type StyleSheet<K extends string, T extends Record<K, NativeStyle>> = {
  [P in K]: {
    [L in keyof T[P] & keyof NativeStyle]?:
      | T[P][L]
      | PlatformStyleProp<L>
      | MediaStyleProp<L>
      | OrientationStyleProp<L>
  }
}

export type StyleSheetFlat<K extends string, T extends Record<K, NativeStyle>> = T

export type StyledSheet<T extends NativeStyle> = {
  [L in keyof T & keyof NativeStyle]?:
    | T[L]
    | PlatformStyleProp<L>
    | MediaStyleProp<L>
    | OrientationStyleProp<L>
}

export type StyledSheetFlat<T extends NativeStyle> = T

export type Conditionals = keyof CurrentBreakpoints | Platform | Orientation

export type ComponentInput = keyof StringComponentProps | typeof Component | ComponentType

export type StringComponentProps = {
  View: ViewProps
  Text: TextProps
  Image: ImageProps
  Button: ButtonProps
  TextInput: TextInputProps
  ScrollView: ScrollViewProps
  TouchableOpacity: TouchableOpacityProps
  'Animated.View': Animated.AnimatedComponent<typeof View>
  Pressable: PressableProps
}

export type ComponentProps<T extends ComponentInput> = T extends keyof StringComponentProps
  ? StringComponentProps[T]
  : T extends Component
  ? T['props']
  : never
