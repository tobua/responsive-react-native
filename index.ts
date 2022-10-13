import { createElement, useEffect, useState } from 'react'
import { Dimensions, ViewStyle, TextStyle, View, StyleProp, Platform } from 'react-native'
import type { Scale, Breakpoints, Value } from './types'
import { avoidZero } from './helper'

export { Styled } from './styled'
export { SelectBreakpoint } from './SelectBreakpoint'

const app = {
  get orientation() {
    const { width, height } = Dimensions.get('screen')
    return height >= width ? 'portrait' : 'landscape'
  },
  get width() {
    return Dimensions.get('window').width
  },
  _breakpoints: { small: 360, medium: 420, large: 999 } as Breakpoints,
  _breakpoint: 'small',
  _breakpointAdapted: false,
  get breakpoints() {
    return this._breakpoints
  },
  set breakpoints(value: Breakpoints) {
    this._breakpoints = value
  },
  get breakpoint() {
    return this._breakpoint
  },
  set breakpoint(value: string) {
    this._breakpoint = value
  },
  scale: {
    minimum: 320,
    maximum: 520,
    factor: 0.5,
  } as Scale,
  rerender: () => {
    updateBreakpoint()
    app.listener.forEach((listener) => listener())
  },
  // Calculates a scaled value.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value: (value: number, breakpoint: string) => {
    if (value === 0) {
      return 0
    }

    if (app.width <= app.scale.minimum) {
      return avoidZero(Math.round(value - app.scale.factor * (value / 2)), value)
    }

    if (app.width >= app.scale.maximum) {
      return Math.round(value + app.scale.factor * (value / 2))
    }

    const percentage = (app.width - app.scale.minimum) / (app.scale.maximum - app.scale.minimum)

    return avoidZero(
      Math.round(value - (app.scale.factor / 2) * value + percentage * app.scale.factor * value),
      value
    )
  },
  // Updates the current breakpoint depending on window width.
  updateBreakpoint: () => {
    const breakpointKeys = Object.keys(app.breakpoints)
    let match: string = breakpointKeys[breakpointKeys.length - 1]

    Object.entries(app.breakpoints)
      .reverse()
      .map(([key, value]) => {
        if (value >= app.width) {
          match = key
        }
      })

    return match
  },
  // Rerender listeners to update styled components.
  listener: [] as (() => void)[],
}

app.breakpoint = app.updateBreakpoint()

// Rerender on orientation change.
Dimensions.addEventListener('change', () => {
  updateBreakpoint()
  app.rerender()
})

// Only the following numeric values listed are scaled, avoids scaling things like "flex: 1".
const sizeProperties: Partial<Record<keyof ViewStyle | keyof TextStyle, true>> = {
  padding: true,
  paddingTop: true,
  paddingRight: true,
  paddingBottom: true,
  paddingLeft: true,
  margin: true,
  marginTop: true,
  marginRight: true,
  marginBottom: true,
  marginLeft: true,
  fontSize: true,
  letterSpacing: true,
  lineHeight: true,
  width: true,
  shadowRadius: true,
  shadowOffset: true,
  textShadowRadius: true,
  height: true,
  borderRadius: true,
  borderWidth: true,
  borderBottomWidth: true,
  borderEndWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderStartWidth: true,
  borderTopWidth: true,
  bottom: true,
  left: true,
  marginEnd: true,
  marginHorizontal: true,
  marginStart: true,
  marginVertical: true,
  maxHeight: true,
  maxWidth: true,
  minHeight: true,
  minWidth: true,
  paddingEnd: true,
  paddingHorizontal: true,
  paddingStart: true,
  paddingVertical: true,
  right: true,
  start: true,
  top: true,
  borderBottomEndRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderBottomStartRadius: true,
  borderTopEndRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderTopStartRadius: true,
}

export const getBreakpoints = () => app.breakpoints
export const setBreakpoint = (breakpoint: string) => {
  app._breakpointAdapted = true
  app.breakpoint = breakpoint
  app.rerender()
}
export const getBreakpoint = () => app.breakpoint
export const getOrientation = () => app.orientation
export const getValue = (value: number) => app.value(value, app.breakpoint)
export const updateBreakpoint = () => {
  if (!app._breakpointAdapted) {
    app.breakpoint = app.updateBreakpoint()
  }
}
export const registerListener = (listener: () => void) => app.listener.push(listener)
export const removeListener = (listener: () => void) => {
  app.listener = app.listener.filter((item) => item !== listener)
}

export const useResponsive = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const listener = () => setCount(count + 1)
    registerListener(listener)
    return () => removeListener(listener)
  }, [count])

  return { breakpoint: getBreakpoint(), setBreakpoint, orientation: app.orientation }
}
export const reset = () => {
  app._breakpointAdapted = false
  app.breakpoint = app.updateBreakpoint()
  app.scale = {
    minimum: 320,
    maximum: 520,
    factor: 0.5,
  }
}

export const rerender = () => app.rerender()

export const Rerender = ({
  children,
  style = { flex: 1, width: '100%' },
}: {
  children: () => JSX.Element | JSX.Element[]
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[]
}) => {
  const [count, setCount] = useState(0)

  app.rerender = () => {
    updateBreakpoint()
    app.listener.forEach((listener) => listener())
    setCount(count + 1)
  }

  return createElement(View, { style, key: count, children: children() })
}

// Does the object contain a breakpoint key?
const hasBreakpointKey = (value: Record<string, any>) => {
  return Object.keys(app.breakpoints).some((key) => typeof value[key] !== 'undefined')
}

const hasPlatformKey = (value: Record<string, any>) => {
  return typeof value.ios !== 'undefined' || typeof value.android !== 'undefined'
}

const closestBreakpointValue = (value: Record<string, any>, property: string) => {
  const breakpoints = Object.keys(app.breakpoints)
  const currentBreakpointIndex = breakpoints.findIndex(
    (current: string) => current === app.breakpoint
  )

  const applicableBreakpoints = breakpoints.splice(0, currentBreakpointIndex + 1).reverse()

  for (let index = 0; index < applicableBreakpoints.length; index++) {
    const current = value[applicableBreakpoints[index]]
    if (typeof current !== 'undefined') {
      if (Array.isArray(current) && current.length === 2 && property !== 'transform') {
        return app.orientation === 'portrait' ? current[0] : current[1]
      }
      return current
    }
  }
}

export const responsiveProperty = (
  property: string,
  value: any,
  nestingFunction: (value: any) => any
) => {
  const valueType = typeof value

  if (valueType === 'string') {
    return value
  }

  if (valueType === 'number') {
    // @ts-ignore
    if (sizeProperties[property]) {
      return app.value(value, app.breakpoint)
    } else {
      return value
    }
  }

  const isArray = Array.isArray(value)

  if (isArray && value.length === 2 && property !== 'transform') {
    const orientationValue = app.orientation === 'portrait' ? value[0] : value[1]
    return typeof orientationValue === 'object'
      ? closestBreakpointValue(orientationValue, property)
      : orientationValue
  }

  if (!isArray && valueType === 'object' && hasBreakpointKey(value)) {
    return closestBreakpointValue(value, property)
  }

  if (!isArray && valueType === 'object' && hasPlatformKey(value)) {
    return app.value(value[Platform.OS], app.breakpoint)
  }

  // Recursively scale nested values like shadowOffset.
  if (typeof value === 'object' && property !== 'transform') {
    return nestingFunction(value)
  }

  return value
}

const createProxy = (target: Record<string, any>) =>
  new Proxy(target, {
    get(currentTarget, prop: string): any {
      const value = currentTarget[prop]
      return responsiveProperty(prop, value, createProxy)
    },
  })

export const createStyles = (sheet: Record<string, Record<string, any>>) => {
  if (process.env.NODE_ENV !== 'production' && typeof sheet !== 'object') {
    console.warn('Invalid input provided to createStyles() needs to be an object.')
  }

  Object.keys(sheet).forEach((key) => {
    const styles = sheet[key]

    if (process.env.NODE_ENV !== 'production' && typeof styles !== 'object') {
      console.warn(`Invalid input provided to createStyles() property ${key} to be an object.`)
    }

    sheet[key] = createProxy(styles)
  })

  return sheet
}

export const configure = ({
  breakpoints,
  breakpoint,
  scale,
  value,
}: {
  breakpoints?: Breakpoints
  breakpoint?: string
  scale?: { minimum?: number; maximum?: number; factor?: number }
  value?: Value
}) => {
  if (breakpoints) {
    app.breakpoints = breakpoints
    // @ts-ignore
    if (!breakpoint && !app.breakpoints[app.breakpoint]) {
      app.breakpoint = Object.keys(app.breakpoints)[0]
    }
  }
  if (breakpoint) {
    app.breakpoint = breakpoint
  }
  if (scale) {
    Object.assign(app.scale, scale)
  }
  if (value) {
    app.value = value
  }
}
