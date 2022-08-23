import React from 'react'
import { View, Text, Platform, ScrollView } from 'react-native'
import { createStyles, Rerender, Select, getBreakpoint, configure } from 'responsive-react-native'
import { Cols, Col } from 'react-native-cols'

configure({
  value: (value, breakpoint) => {
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

const monoFonFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'

const styles = createStyles({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 60,
  },
  wrapper: {
    alignSelf: 'stretch',
    flex: 1,
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    marginRight: 20,
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 15,
  },
  text: {
    fontSize: 16,
  },
  spacer: {
    marginBottom: 20,
  },
  codeWrapper: {
    padding: 5,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    borderWidth: 2,
  },
  code: {
    fontSize: 10,
    fontFamily: monoFonFamily,
  },
  exampleView: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  exampleText: {
    fontSize: 16,
    color: 'white',
  },
  col: {
    backgroundColor: 'lightblue',
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  breakpoint: {
    color: 'red',
    fontWeight: 'bold',
  },
})

function NestedBreakpoint() {
  return (
    <Text style={[styles.text, styles.spacer]}>
      Current breakpoint: <Text style={styles.breakpoint}>{getBreakpoint()}</Text>
    </Text>
  )
}

const sizeToColsMap = {
  small: 5,
  medium: 4,
  large: 3,
}

export default function App() {
  return (
    <View style={styles.screen}>
      <Rerender>
        {() => (
          <ScrollView style={styles.wrapper}>
            <View style={styles.header}>
              <View style={styles.dot} />
              <Text style={styles.heading}>responsive-react-native</Text>
            </View>
            <Text style={[styles.text, styles.spacer]}>
              This plugin allows you to scale text and any arbitrary sizes according to the size
              specified.
            </Text>
            <NestedBreakpoint />
            <Text style={[styles.title, styles.spacer]}>Responsive Values</Text>
            <View style={[styles.codeWrapper, styles.spacer]}>
              <Text style={styles.code}>{`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'blue'
  },
  text: {
    fontSize: 16,
    color: 'white'
  },
})

export default () => (
  <View style={styles.view}>
    <Text style={styles.text}>Hello Responsive World</Text>
  </View>
)`}</Text>
            </View>
            <View style={styles.exampleView}>
              <Text style={styles.exampleText}>Hello Responsive World</Text>
            </View>
            <Text style={[styles.title, styles.spacer]}>Breakpoint-Based Grid</Text>
            <Cols cols={sizeToColsMap[getBreakpoint()]}>
              <Col style={styles.col} />
              <Col style={styles.col} />
              <Col style={styles.col} />
              <Col style={styles.col} />
              <Col style={styles.col} />
            </Cols>
          </ScrollView>
        )}
      </Rerender>
      <Select />
    </View>
  )
}
