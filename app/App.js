import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import {
  createStyles,
  Rerender,
  SelectBreakpoint,
  getBreakpoint,
  configure,
  Styled,
  useBreakpoint,
} from 'responsive-react-native'
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

const styles = createStyles({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  wrapper: {
    alignSelf: 'stretch',
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
    marginBottom: 10,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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

const Content = Styled('View', {
  paddingTop: 60,
  paddingLeft: 20,
  paddingRight: 20,
})

const CustomView = Styled(
  'View',
  {
    width: 40,
    height: 40,
    backgroundColor: 'green',
  },
  {
    small: {
      backgroundColor: 'red',
    },
    large: {
      backgroundColor: 'blue',
    },
    highlight: {
      backgroundColor: 'lightblue',
    },
    rounded: {
      borderRadius: 10,
    },
  }
)

const Hook = () => {
  const { breakpoint, setBreakpoint } = useBreakpoint()

  return (
    <View style={styles.row}>
      <Text>
        Current breakpoint: <Text style={styles.breakpoint}>{breakpoint}</Text>
      </Text>
      <Button title="Set Small" onPress={() => setBreakpoint('small')} />
    </View>
  )
}

export default function App() {
  const [highlighted, setHighlight] = useState(false)
  const [rounded, setRounded] = useState(false)

  return (
    <View style={styles.screen}>
      <Content>
        <Rerender style={styles.wrapper}>
          {() => (
            <>
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
              <Text style={styles.spacer}>
                Regular numeric stylesheet values like padding are automatically scaled.
              </Text>
              <View style={styles.exampleView}>
                <Text style={styles.exampleText}>Hello Responsive World</Text>
              </View>
              <Text style={[styles.title, styles.spacer]}>Breakpoint-Based Grid</Text>
              <Text style={styles.spacer}>
                During render the current breakpoint can be accessed to render elements accordingly.
              </Text>
              <Cols cols={sizeToColsMap[getBreakpoint()]}>
                <Col style={styles.col} />
                <Col style={styles.col} />
                <Col style={styles.col} />
                <Col style={styles.col} />
                <Col style={styles.col} />
              </Cols>
            </>
          )}
        </Rerender>
        <Text style={[styles.title, styles.spacer]}>Styled-Like Interface</Text>
        <Text style={styles.spacer}>
          This interface doesn't require any rerenders and works well to assign props based styles.
        </Text>
        <View style={[styles.row, styles.spacer]}>
          <CustomView highlight={highlighted} rounded={rounded} />
          <Button title="Highlight" onPress={() => setHighlight(!highlighted)} />
          <Button title="Round" onPress={() => setRounded(!rounded)} />
        </View>
        <Text style={[styles.title, styles.spacer]}>useBreakpoint</Text>
        <Hook />
      </Content>
      <SelectBreakpoint />
    </View>
  )
}
