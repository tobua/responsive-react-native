import React, { useRef, useEffect, MutableRefObject, ReactElement, FunctionComponent } from 'react'
import * as ReactNative from 'react-native'
import { registerListener, removeListener, responsiveProperty, getBreakpoint } from './index'
import { NativeStyle, StyledSheet, Conditionals, ComponentInput, ComponentProps } from './types'

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

const assignStyles = (styles: NativeStyle | NativeStyle[], ref: MutableRefObject<any>) => {
  if (ref.current) {
    if (ref.current.setNativeProps) {
      ref.current.setNativeProps({
        style: styles,
      })
    } else {
      // react-native-web compatibility
      Object.assign(ref.current.style, styles)
    }
  }
}

importAutorunIfInstalled()

const responsifyStyles = (styles: NativeStyle) => {
  const properties = Object.keys(styles) as (keyof NativeStyle)[]
  properties.forEach((property) => {
    // @ts-ignore
    styles[property] = responsiveProperty(property, styles[property], responsifyStyles)
  })
  return styles
}

const generateStyles = <T extends NativeStyle, S extends string>(
  baseStyles: StyledSheet<T> | ((props: any) => StyledSheet<T>),
  conditionalStyles:
    | { [U in S & Conditionals]?: StyledSheet<T> }
    | ((props: any) => { [U in S & Conditionals]?: StyledSheet<T> }) = {},
  props: Record<string, any>,
  ref: MutableRefObject<any>,
  isUpdate = false,
) => {
  if (typeof baseStyles === 'function' || typeof conditionalStyles === 'function') {
    return autoRunStyles(
      baseStyles as (props: any) => StyledSheet<T>,
      conditionalStyles as (props: any) => Record<string, StyledSheet<T>>,
      props,
      ref,
      isUpdate,
    ) as NativeStyle[]
  }

  const styles = {}
  const breakpoint = getBreakpoint() as S & Conditionals
  const platform = ReactNative.Platform.OS as S & Conditionals

  Object.assign(styles, baseStyles)

  if (typeof conditionalStyles[breakpoint] === 'object') {
    Object.assign(styles, conditionalStyles[breakpoint])
  }

  if (typeof conditionalStyles[platform] === 'object') {
    Object.assign(styles, conditionalStyles[platform])
  }

  const propsKeys = Object.keys(props) as (S & Conditionals)[]

  propsKeys.forEach((property) => {
    if (typeof conditionalStyles[property] === 'object' && props[property] === true) {
      Object.assign(styles, conditionalStyles[property])
    }
  })

  if (!isUpdate && props.style) {
    if (Array.isArray(props.style)) {
      return [...props.style, responsifyStyles(styles)] as NativeStyle[]
    }
    return [props.style, responsifyStyles(styles)] as NativeStyle[]
  }

  return responsifyStyles(styles)
}

const autoRunStyles = <T extends NativeStyle>(
  baseStyles: (props: any) => StyledSheet<T>,
  conditionalStyles: (props: any) => Record<string, StyledSheet<T>>,
  props: Record<string, any>,
  ref: MutableRefObject<any>,
  isUpdate: boolean,
) => {
  if (typeof autorun !== 'function') {
    console.warn(
      'responsive-react-native: failed to import MobX make sure to install it with "npm i mobx".',
    )
  }

  let styles: NativeStyle | null = null

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

    const currentStylesFlat = responsifyStyles(currentStyles as NativeStyle)

    if (!isUpdate && styles) {
      assignStyles(currentStylesFlat, ref)
    } else {
      styles = currentStylesFlat
    }
  })

  if (props.style) {
    if (Array.isArray(props.style)) {
      return [...props.style, styles]
    }
    return [props.style, styles]
  }

  return styles
}

function resolveType(
  type: ComponentInput,
  Components: Record<string, any>,
): FunctionComponent<ComponentProps<ComponentInput>> {
  if (typeof type !== 'string' && !Array.isArray(type)) {
    return type as unknown as FunctionComponent<ComponentProps<ComponentInput>>
  }

  if (typeof type === 'string' && type.includes('.')) {
    return type
      .split('.')
      .reduce((items, property) => items[property], Components) as FunctionComponent<
      ComponentProps<ComponentInput>
    >
  }

  return Components[type as string]
}

// Overloads necessary, as case when conditionalStyles defaults to the initializer will not work.
// Overload for when conditionalStyles is explicitly provided
export function Styled<T extends NativeStyle, V extends Object, S extends string>(
  type: ComponentInput,
  baseStyles: StyledSheet<T> | ((props: V) => StyledSheet<T>),
  conditionalStyles:
    | { [U in S | Conditionals]?: StyledSheet<T> }
    | ((props: V) => { [U in S | Conditionals]?: StyledSheet<T> }),
): (
  props: ComponentProps<ComponentInput> & { [K in Exclude<S, Conditionals>]?: boolean } & V,
) => ReactElement<any>

// Overload for when conditionalStyles uses the default value
export function Styled<T extends NativeStyle, V extends Object, S extends string = ''>(
  type: ComponentInput,
  baseStyles: StyledSheet<T> | ((props: V) => StyledSheet<T>),
): (
  props: ComponentProps<ComponentInput> & { [K in Exclude<S, Conditionals>]?: boolean } & V,
) => ReactElement<any>

// TODO extend existing styled
export function Styled<T extends NativeStyle, V extends Object, S extends string>(
  type: ComponentInput,
  baseStyles: StyledSheet<T> | ((props: V) => StyledSheet<T>),
  conditionalStyles:
    | { [U in S | Conditionals]?: StyledSheet<T> }
    | ((props: V) => { [U in S | Conditionals]?: StyledSheet<T> }) = {} as {
    [U in S | Conditionals]?: StyledSheet<T>
  },
) {
  const ComponentType = resolveType(type, ReactNative)

  if (typeof ComponentType !== 'object' && typeof ComponentType !== 'function') {
    console.warn(
      `responsive-react-native: component ${type} passed to Styled isn't a valid RN component.`,
    )
  }

  return ({
    ...props
  }: ComponentProps<ComponentInput> & { [K in Exclude<S, Conditionals>]?: boolean } & V) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<any>()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const listener = () => {
        assignStyles(generateStyles(baseStyles, conditionalStyles, props, ref, true), ref)
      }
      registerListener(listener)

      return () => removeListener(listener)
    })

    return React.createElement(ComponentType, {
      ...props,
      style: generateStyles(baseStyles, conditionalStyles, props, ref),
      ref,
    })
  }
}
