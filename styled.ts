import React, { useRef, useEffect, MutableRefObject } from 'react'
import * as ReactNative from 'react-native'
import {
  registerListener,
  removeListener,
  responsiveProperty,
  getBreakpoint,
  getOrientation,
} from './index'

// @ts-ignore
let autorun: Function

const importAutorunIfInstalled = async () => {
  if (typeof jest !== 'undefined') {
    // @ts-ignore
    autorun = global.autorun
    return
  }
  try {
    const mobx = await import('mobx')
    autorun = mobx.autorun
  } catch (_) {}
}

importAutorunIfInstalled()

type BaseStyles = Record<string, any> | ((props: any) => Record<string, any>)
type ConditionalStyles =
  | Record<string, Record<string, any>>
  | ((props: any) => Record<string, Record<string, any>>)

const responsifyStyles = (styles: Record<string, any>) => {
  Object.keys(styles).forEach((property) => {
    styles[property] = responsiveProperty(property, styles[property], responsifyStyles)
  })

  return styles
}

const generateStyles = (
  baseStyles: BaseStyles,
  conditionalStyles: ConditionalStyles,
  props: Record<string, any>,
  ref: MutableRefObject<any>
) => {
  if (typeof baseStyles === 'function' || typeof conditionalStyles === 'function') {
    return autoRunStyles(
      baseStyles as () => Record<string, any>,
      conditionalStyles as () => Record<string, Record<string, any>>,
      props,
      ref
    )
  }

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

const autoRunStyles = (
  baseStyles: (props: any) => Record<string, any>,
  conditionalStyles: (props: any) => Record<string, Record<string, any>>,
  props: Record<string, any>,
  ref: MutableRefObject<any>
) => {
  if (typeof autorun !== 'function') {
    console.warn(
      'responsive-react-native: failed to import MobX make sure to install it with "npm i mobx".'
    )
  }

  let styles: Record<string, any> | null = null

  autorun(() => {
    let currentStyles = baseStyles(props)
    const currentConditionalStyles =
      typeof conditionalStyles === 'function' ? conditionalStyles(props) : conditionalStyles
    const breakpoint = getBreakpoint()

    if (typeof currentConditionalStyles[breakpoint] === 'object') {
      Object.assign(currentStyles, currentConditionalStyles[breakpoint])
    }

    Object.keys(props).forEach((property) => {
      if (typeof currentConditionalStyles[property] === 'object' && props[property] === true) {
        Object.assign(currentStyles, currentConditionalStyles[property])
      }
    })

    currentStyles = responsifyStyles(currentStyles)

    if (styles) {
      ref.current?.setNativeProps({
        style: currentStyles,
      })
    } else {
      styles = currentStyles
    }
  })

  return styles as unknown as Record<string, any>
}

// TODO extend existing styled
export function Styled<T extends Record<string, any>>(
  type: string,
  baseStyles: BaseStyles,
  conditionalStyles: ConditionalStyles = {}
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
          style: generateStyles(baseStyles, conditionalStyles, props, ref),
        })
      }
      registerListener(listener)

      return () => removeListener(listener)
    })

    return React.createElement(Component, {
      ...props,
      style: generateStyles(baseStyles, conditionalStyles, props, ref),
      ref,
    })
  }
}
