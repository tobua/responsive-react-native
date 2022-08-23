<p align="center">
  <img src="https://github.com/tobua/responsive-react-native/raw/main/video.gif" alt="Responsive Video" width="250">
  <!--- Recorded in iOS Simulator and converted with Gifsky from Mac App Store. -->
</p>

# responsive-react-native

Unlike web browsers React Native doesn't support media queries to create responsive designs. With this plugin one can keep regular numeric values in the styles that are automatically adapted based on the current viewport size.

- Uses regular pixel based values
- No refactoring required (backwards compatible with default RN styling)
- Automatically scales values linearly
- Supports breakpoints
- Size calculated based on viewport size or user preference

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
  <img src="https://raw.githubusercontent.com/tobua/responsive-react-native/main/scale.svg?sanitize=true" alt="Scaled values">
</p>

## Rerendering

Since neither native Android or iOS have support for something like media queries this plugin requires the responsive parts of the application to be rerendered when the size changes. Full rerendering usually takes some time and will not result in an application that can be dynamically resized. A rerender can be triggered when the user adapts the size preference using the built-in `<Select />` component or when the application switches between landscape and portrait mode.

Any component that is rendered using responsive styles should be rendered inside the `Rerender` component. A rerender can be manually triggered using the `rerender` method or occurs, upon changes to `<Select />`, when the orientation changes or when the breakpoint is changed using `setBreakpoint`.

```jsx
import { Rerender, Select, rerender } from 'responsive-react-native'

function App() {
  return (
    <View>
      <Rerender>{() => <View key={getSize()} style={styles.view}></View>}</Rerender>
      <Text>Static Text</Text>
      <Select />
      <Button title="Rerender App" onPress={() => rerender()}>
    </View>
  )
}
```

## Refactoring

Since the method is compatible with the default way of initializing styles once using `StyleSheet.create` an existing application can be migrated by adding a single line at the entry file of the application.

```js
import { AppRegistry, StyleSheet } from 'react-native'
import { createStyles } from 'responsive-react-native'
import App from './App'

Object.assign(StyleSheet, { create: createStyles })

AppRegistry.registerComponent('responsive-app', () => App)
```

This will override the `StyleSheet.create` to use the method supplied by this plugin.

## Similar Approaches

A previous approach to make mobile applications responsive is to calculate percentages based on the full width of the screen. This approach is used by other responsive plugins for React Native and also used in Swift UI by using `UIScreen.main.bounds.width`. While this approach can certainly work it doesn't feel very intuitive. On the web similar units called `vw` (viewport width, 100vw = 100% viewport) and `vh` (viewport height) exist but are rarely used when compared to breakpoints. The approach taken by this plugin tries to get the best of both world by combining breakpoints and pixel based values. For accessibility purposes users often want to scale the font size system wide which this plugin automatically supports similar to `ScaledMetric` in iOS.
