import React, { useState } from 'react'
import { View, Text, Button, Dimensions } from 'react-native'
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
import { observable, runInAction } from 'mobx'

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
  annotation: {
    fontSize: 12,
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
    <Text style={[styles.annotation]}>
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

const Store = observable({
  highlight: false,
})

const ObservableView = Styled('View', () => ({
  width: 30,
  height: 30,
  backgroundColor: Store.highlight ? 'red' : 'blue',
}))

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
                <View styles={styles.row}>
                  <Text style={styles.heading}>responsive-react-native</Text>
                  <Text style={styles.annotation}>
                    Width: {Dimensions.get('screen').width}px Scale:{' '}
                    {Dimensions.get('screen').scale} FontScale: {Dimensions.get('screen').fontScale}
                  </Text>
                  <NestedBreakpoint />
                </View>
              </View>
              <Text style={[styles.text, styles.spacer]}>
                This plugin allows you to scale text and any arbitrary sizes according to the size
                specified.
              </Text>

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
        <Text style={[styles.title, styles.spacer]}>MobX Observable Styles</Text>
        <Text style={styles.spacer}>
          When MobX observables are used to generate the styles they will automatically update when
          the state changes.
        </Text>
        <View style={[styles.row, styles.spacer]}>
          <ObservableView />
          <Button
            title="Highlight"
            onPress={() => {
              runInAction(() => {
                Store.highlight = !Store.highlight
              })
            }}
          />
        </View>
      </Content>
      <SelectBreakpoint />
    </View>
  )
}
