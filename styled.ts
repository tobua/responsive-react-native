import React, { useRef, useEffect } from 'react'
import * as ReactNative from 'react-native'
import {
  registerListener,
  removeListener,
  scaleableProperty,
  getValue,
  getBreakpoint,
} from './index'

const responsifyStyles = (styles: Record<string, any>) => {
  Object.keys(styles).forEach((key) => {
    const value = styles[key]
    if (typeof value === 'object') {
      return responsifyStyles(value)
    }
    if (scaleableProperty(key, value)) {
      styles[key] = getValue(value)
    }
  })

  return styles
}

const generateStyles = (
  baseStyles: Record<string, any>,
  conditionalStyles: Record<string, Record<string, any>>,
  props: Record<string, any>
) => {
  const styles = {}
  const breakpoint = getBreakpoint()

  Object.assign(styles, baseStyles)

  if (typeof conditionalStyles[breakpoint] === 'object') {
    Object.assign(styles, conditionalStyles[breakpoint])
  }

  Object.keys(props).forEach((property) => {
    if (typeof conditionalStyles[property] === 'object' && props[property] === true) {
      Object.assign(styles, conditionalStyles[property])
    }
  })

  return responsifyStyles(styles)
}

// TODO extend existing styled
export function Styled<T extends Record<string, any>>(
  type: string,
  baseStyles: Record<string, any>,
  conditionalStyles: Record<string, Record<string, any>> = {}
) {
  // @ts-ignore
  const Component = ReactNative[type]

  if (typeof Component !== 'object' && typeof Component !== 'function') {
    console.warn(
      `responsive-react-native: component ${type} passed to Styled isn't a valid RN component.`
    )
  }

  return ({ ...props }: T) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<any>()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const listener = () => {
        ref.current?.setNativeProps({
          style: generateStyles(baseStyles, conditionalStyles, props),
        })
      }
      registerListener(listener)

      return () => removeListener(listener)
    })

    return React.createElement(Component, {
      ...props,
      style: generateStyles(baseStyles, conditionalStyles, props),
      ref,
    })
  }
}
