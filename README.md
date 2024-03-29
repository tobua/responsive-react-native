<p align="center">
  <a href="https://responsive-react-native.vercel.app/">
    <img src="https://github.com/tobua/responsive-react-native/raw/main/video.gif" alt="Responsive Video" width="250">
    <!--- Recorded in iOS Simulator and converted with Gifsky from Mac App Store. -->
  </a>
</p>

# responsive-react-native

Unlike web browsers React Native doesn't support media queries to create responsive designs. With this plugin one can keep regular numeric values in the styles that are automatically adapted based on the current viewport size.

- Uses regular pixel based values
- No refactoring required (backwards compatible with default RN styling)
- Automatically scales values linearly
- Supports breakpoints
- Size calculated based on viewport size or user preference
- Styled-components like component interface to avoid rerender
- Type checking with TypeScript
- Check out the web based [documentation](https://responsive-react-native.vercel.app/) with examples
- Here is a [blog post](https://onwebfocus.com/styled) discussing this plugin

## Installation and Usage

```
npm install responsive-react-native
```

```jsx
import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    padding: 20,
    height: 40,
    flex: 1, // Remains unmodified.
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 16,
  },
})

export const App = () => (
  <View style={styles.view}>
    <Text style={styles.text}>Hello Responsive World</Text>
  </View>
)
```

## Scaled Values

Instead of the values just jumping between breakpoints as is usually done this plugin will linearly scale all values automatically.

<p align="center">
  <img src="https://raw.githubusercontent.com/tobua/responsive-react-native/main/scale.svg" alt="Scaled values">
</p>

```js
import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    height: 100, // => 100px for 480px viewport width, 80px for 320px viewport, 120px for 640px viewport.
    marginHorizontal: 20, // => 20px for 480px viewport width, 16px for 320px viewport, 24px for 640px viewport.
  },
})
```

The viewports as well as the strength of the scaling can be [configured](#configuration) as described below.

## Adaptive Values (Breakpoints and Orientation)

Similar to breakpoints in CSS values can be customized inline based on the current breakpoint or the orientation. An array `[portrait, landscape]` will pick the appropriate value depending on the orientation while an object `{ small: any, large: any }` will pick the value appropriate for the current breakpoint. If the current breakpoint is missing the nearest one below will be used.

```js
import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    backgroundColor: ['blue', 'red'], // => blue in portrait, red in landscape.
    height: { small: 40, large: 80 }, // => 40 for small and medium breakpoint, 80 on large breakpoint.
    padding: [
      { small: 40, medium: 60 },
      { small: 20, large: 80 },
    ], // Both approaches can be combined either way.
  },
})
```

## Rerendering

Since neither native Android or iOS have support for something like media queries this plugin requires the responsive parts of the application to be rerendered when the size changes. Full rerendering usually takes some time and will not result in an application that can be dynamically resized. A rerender can be triggered when the user adapts the size preference using the built-in `<SelectBreakpoint />` component or when the application switches between landscape and portrait mode.

Any component that is rendered using responsive styles should be rendered inside the `Rerender` component. A rerender can be manually triggered using the `rerender` method or occurs, upon changes to `<SelectBreakpoint />`, when the orientation changes or when the breakpoint is changed using `setBreakpoint`.

```jsx
import { Rerender, SelectBreakpoint, rerender } from 'responsive-react-native'

function App() {
  return (
    <View>
      <Rerender>{() => <View key={getSize()} style={styles.view}></View>}</Rerender>
      <Text>Static Text</Text>
      <SelectBreakpoint />
      <Button title="Rerender App" onPress={() => rerender()}>
    </View>
  )
}
```

## Refactoring

Since the method is compatible with the default way of initializing styles once using `StyleSheet.create` an existing application can be migrated by reassigning the method to use the one from this plugin.

```js
// refactor-stylesheet.js
import { StyleSheet } from 'react-native'
import { createStyles } from 'responsive-react-native'

Object.assign(StyleSheet, { create: createStyles })
```

```js
// index.js
import { AppRegistry } from 'react-native'
import './refactor-stylesheet' // Import this before any other markup.
import App from './App'

AppRegistry.registerComponent('responsive-app', () => App)
```

## Styled Components to Avoid Rerendering

Similar to most CSS-in-JS React approaches known from the web this interface allows you to apply styles to components. When using props, breakpoints or the platform as conditional keys the styles will automatically be merged. This approach doesn't require a `<Rerender />` component and only the styles need to be recalculated when the breakpoint or window size changes. Numeric values are automatically scaled responsively.

```jsx
import { View } from 'react-native'
import { Styled } from 'responsive-react-native'

const CustomView = Styled(
  View,
  {
    backgroundColor: ['gray', 'white'], // White in landscape.
    padding: 10,
  },
  {
    // Truthy prop.
    highlight: {
      backgroundColor: 'red',
      padding: { small: 20, large: 60 }, // Full stylesheet support.
    },
    // Current breakpoint.
    large: {
      backgroundColor: 'blue',
    },
    // Current OS.
    ios: {
      padding: 5,
    },
  }
)

export default () => <CustomView highlight />
```

## Connect Styles to MobX Observables

When passing a function returning a stylesheet and `mobx` is installed the styles will automatically be updated whenever any state changes.

```jsx
import { observable } from 'mobx'
import { Styled } from 'responsive-react-native'

const Store = observable({ highlight: false })

const ObservableView = Styled('View', () => ({
  backgroundColor: Store.highlight ? 'red' : 'gray',
}))

export default () => (
  <View>
    <ObservableView />
    <Button
      title="Highlight"
      onPress={() =>
        runInAction(() => {
          Store.highlight = !Store.highlight
        })
      }
    />
  </View>
)
```

## `useResponsive`

This React hook also avoids the need for components to be wrapped in `<Rerender />` and can be handy when dynamically rendering something based on the current breakpoint.

```jsx
import { useResponsive } from 'responsive-react-native'

export default function App() {
  const { breakpoint, setBreakpoint, orientation } = useResponsive()
  return (
    <View style={{ margin: breakpoint === 'large' ? 0 : 10 }}>
      <Text>Current breakpoint: {breakpoint}</Text>
      <Button title="Set Breakpoint to Small" onPress={() => setBreakpoint('small')} />
    </View>
  )
}
```

## Configuration

The scaling of responsive values as well as the breakpoints can be configured.

```ts
import { configure } from 'responsive-react-native'

configure({
  // Initial breakpoint, default inferred from breakpoint values.
  breakpoint: 'small',
  // Available breakpoints, default { small: 360, medium: 420, large: 999 }.
  breakpoints: {
    tiny: 300,
    normal: 600,
    huge: 800,
  },
  // Responsive scaling configuration, default { minimum: 320, maximum: 520, factor: 0.5 }.
  scale: {
    minimum: 300,
    maximum: 600,
    factor: 1,
  },
  // Method used to calculate responsive values, default linear scaling according to "scale" configuration.
  value: (value: number, breakpoint: string, orientation: 'portrait' | 'landscape') => {
    if (breakpoint === 'medium') {
      return value
    }

    const halfValue = Math.round(value / 6)

    if (breakpoint === 'small') {
      return value - halfValue
    }

    return value + halfValue
  },
})
```

The `scale.factor` describes the degree to which the values are scaled between the viewports defined. A factor of `1` means that `0.5` times the `value` will be added or subtracted when the minimum or maximum viewport is reached. While very extreme a factor of `2` would lead to zero values at the minimum viewport and double the value at the maximum. The default of `0.5` has proven useful for mobile applications and will scale the value by 25%. This still results in a 50% difference between the minimum and maximum values.

When configuring breakpoints with TypeScript use the following to override `CustomBreakpoints` types for proper type checking.

```ts
declare module 'responsive-react-native' {
  interface CustomBreakpoints {
    tiny: number
    normal: number
    huge: number
  }
}
```

## Similar Approaches

A previous approach to make mobile applications responsive is to calculate percentages based on the full width of the screen. This approach is used by other responsive plugins for React Native and also used in Swift UI by using `UIScreen.main.bounds.width`. While this approach can certainly work it doesn't feel very intuitive. On the web similar units called `vw` (viewport width, 100vw = 100% viewport) and `vh` (viewport height) exist but are rarely used when compared to breakpoints. The approach taken by this plugin tries to get the best of both world by combining breakpoints and pixel based values. For accessibility purposes users often want to scale the font size system wide which this plugin automatically supports similar to `ScaledMetric` in iOS.
