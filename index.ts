import { createElement, useState } from 'react'
import { Dimensions, ViewStyle, TextStyle, View } from 'react-native'
import type { Scale, Breakpoints, Value } from './types'

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
    maximum: 640,
    factor: 0.5,
  } as Scale,
  rerender: () => {},
  // Calculates a scaled value.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value: (value: number, breakpoint: string) => {
    if (app.width <= app.scale.minimum) {
      return Math.round(value - app.scale.factor * (value / 2))
    }

    if (app.width >= app.scale.maximum) {
      return Math.round(value + app.scale.factor * (value / 2))
    }

    const percentage = (app.width - app.scale.minimum) / (app.scale.maximum - app.scale.minimum)

    return Math.round(
      value - (app.scale.factor / 2) * value + percentage * app.scale.factor * value
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
}

app.breakpoint = app.updateBreakpoint()

// Rerender on orientation change.
Dimensions.addEventListener('change', () => {
  app.updateBreakpoint()
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
  app.breakpoint = breakpoint
  app.rerender()
}
export const getBreakpoint = () => app.breakpoint
export const getValue = (value: number) => app.value(value, app.breakpoint)
export const updateBreakpoint = () => {
  app.breakpoint = app.updateBreakpoint()
}

export const rerender = () => app.rerender()

export const Rerender = ({
  children,
  style = { flex: 1, width: '100%' },
}: {
  children: () => JSX.Element | JSX.Element[]
  style?: ViewStyle
}) => {
  const [count, setCount] = useState(0)

  app.rerender = () => {
    app.updateBreakpoint()
    setCount(count + 1)
  }

  return createElement(View, { style, key: count, children: children() })
}

export const createStyles = (sheet: Record<string, Record<string, any>>) => {
  if (process.env.NODE_ENV !== 'production' && typeof sheet !== 'object') {
    console.warn('Invalid input provided to createStyles() needs to be an object.')
  }

  Object.keys(sheet).forEach((key) => {
    const styles = sheet[key]

    if (process.env.NODE_ENV !== 'production' && typeof styles !== 'object') {
      console.warn(`Invalid input provided to createStyles() property ${key} to be an object.`)
    }

    // Only create proxy if there are any size properties that will scale.
    const hasResponsiveProperties = Object.values(styles)
      .map((value) => typeof value === 'number')
      .some((value) => value === true)

    if (!hasResponsiveProperties) {
      return
    }

    sheet[key] = new Proxy(styles, {
      get(target, prop: string) {
        const value = target[prop]

        // @ts-ignore
        if (typeof value !== 'number' || !sizeProperties[prop]) {
          return value
        }

        return app.value(value, app.breakpoint)
      },
    })
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
