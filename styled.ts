import React, { useRef, useEffect, MutableRefObject } from 'react'
import * as ReactNative from 'react-native'
import { registerListener, removeListener, responsiveProperty, getBreakpoint } from './index'
import { StyledComponent } from './types'

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
  ref: MutableRefObject<any>,
  isUpdate = false
) => {
  if (typeof baseStyles === 'function' || typeof conditionalStyles === 'function') {
    return autoRunStyles(
      baseStyles as () => Record<string, any>,
      conditionalStyles as () => Record<string, Record<string, any>>,
      props,
      ref,
      isUpdate
    )
  }

  const styles = {}
  const breakpoint = getBreakpoint()

  Object.assign(styles, baseStyles)

  if (typeof conditionalStyles[breakpoint] === 'object') {
    Object.assign(styles, conditionalStyles[breakpoint])
  }

  if (typeof conditionalStyles[ReactNative.Platform.OS] === 'object') {
    Object.assign(styles, conditionalStyles[ReactNative.Platform.OS])
  }

  Object.keys(props).forEach((property) => {
    if (typeof conditionalStyles[property] === 'object' && props[property] === true) {
      Object.assign(styles, conditionalStyles[property])
    }
  })

  if (!isUpdate && props.style) {
    if (Array.isArray(props.style)) {
      return [...props.style, responsifyStyles(styles)]
    }
    return [props.style, responsifyStyles(styles)]
  }

  return responsifyStyles(styles)
}

const autoRunStyles = (
  baseStyles: (props: any) => Record<string, any>,
  conditionalStyles: (props: any) => Record<string, Record<string, any>>,
  props: Record<string, any>,
  ref: MutableRefObject<any>,
  isUpdate: boolean
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

    if (typeof currentConditionalStyles[ReactNative.Platform.OS] === 'object') {
      Object.assign(currentStyles, currentConditionalStyles[ReactNative.Platform.OS])
    }

    Object.keys(props).forEach((property) => {
      if (typeof currentConditionalStyles[property] === 'object' && props[property] === true) {
        Object.assign(currentStyles, currentConditionalStyles[property])
      }
    })

    currentStyles = responsifyStyles(currentStyles)

    if (!isUpdate && styles) {
      ref.current?.setNativeProps({
        style: currentStyles,
      })
    } else {
      styles = currentStyles
    }
  })

  if (props.style) {
    if (Array.isArray(props.style)) {
      return [...props.style, styles as unknown as Record<string, any>]
    }
    return [props.style, styles as unknown as Record<string, any>]
  }

  return styles as unknown as Record<string, any>
}

function resolveType(type: StyledComponent, Components: Record<string, any>) {
  if (typeof type !== 'string' && !Array.isArray(type)) {
    return type
  }

  const properties = Array.isArray(type) ? type : type.split('.')
  return properties.reduce((items, property) => items[property], Components) as any
}

// TODO extend existing styled
export function Styled<T extends Record<string, any>>(
  type: StyledComponent,
  baseStyles: BaseStyles,
  conditionalStyles: ConditionalStyles = {}
) {
  const Component = resolveType(type, ReactNative)

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
          style: generateStyles(baseStyles, conditionalStyles, props, ref, true),
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
