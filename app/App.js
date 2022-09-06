import React, { useState } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native'
import {
  createStyles,
  Rerender,
  SelectBreakpoint,
  getBreakpoint,
  getOrientation,
  configure,
  Styled,
  useResponsive,
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
    paddingBottom: 40,
    paddingTop: 50,
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
    fontSize: 10,
  },
  spacer: {
    marginBottom: 6,
  },
  exampleView: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: 'dodgerblue',
  },
  exampleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  col: {
    backgroundColor: 'lightblue',
    height: 30,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  breakpoint: {
    color: 'red',
    fontWeight: 'bold',
  },
  orientation: {
    color: ['lightblue', 'dodgerblue'],
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    padding: Platform.OS === 'ios' ? 0 : 5,
    borderRadius: Platform.OS === 'ios' ? 0 : 5,
    backgroundColor: Platform.OS === 'ios' ? 'white' : '#2196F3',
    marginLeft: 10,
  },
  button: {
    fontSize: 14,
    color: Platform.OS === 'ios' ? '#007AFF' : 'white',
  },
})

function NestedBreakpoint() {
  console.log('nested', getOrientation(), styles.orientation.color)
  return (
    <Text style={[styles.annotation]}>
      Breakpoint: <Text style={styles.breakpoint}>{getBreakpoint()}</Text> Orientation:{' '}
      <Text style={styles.orientation}>{getOrientation()}</Text>
    </Text>
  )
}

function Button({ onPress, title }) {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  )
}

const sizeToColsMap = {
  small: 5,
  medium: 4,
  large: 3,
}

const Content = Styled('ScrollView', {
  paddingLeft: 15,
  paddingRight: 15,
})

const CustomView = Styled(
  'View',
  {
    width: [40, 80],
    height: 40,
    backgroundColor: 'lightblue',
  },
  {
    small: {
      backgroundColor: 'lightskyblue',
    },
    large: {
      backgroundColor: 'dodgerblue',
    },
    highlight: {
      backgroundColor: 'red',
    },
    rounded: {
      borderRadius: 10,
    },
  }
)

const Hook = () => {
  const { breakpoint, orientation, setBreakpoint } = useResponsive()

  return (
    <View style={[styles.row, styles.spacer]}>
      <Text style={styles.annotation}>
        Breakpoint: <Text style={styles.breakpoint}>{breakpoint}</Text> Orientation:{' '}
        <Text style={styles.orientation}>{orientation}</Text>
      </Text>
      <Button title="Set Small" onPress={() => setBreakpoint('small')} />
    </View>
  )
}

const Store = observable({
  highlight: false,
})

const ObservableView = Styled('View', () => ({
  width: [30, 60],
  height: 30,
  backgroundColor: Store.highlight ? 'red' : 'lightblue',
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
              <Text style={[styles.text, styles.spacer]}>
                Regular numeric stylesheet values like padding are automatically scaled.
              </Text>
              <View style={styles.exampleView}>
                <Text style={styles.exampleText}>Hello Responsive World</Text>
              </View>
              <Text style={[styles.title, styles.spacer]}>Breakpoint-Based Grid</Text>
              <Text style={[styles.text, styles.spacer]}>
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
        <Text style={[styles.text, styles.spacer]}>
          This interface doesn't require any rerenders and works well to assign props based styles.
        </Text>
        <View style={[styles.row, styles.spacer]}>
          <CustomView highlight={highlighted} rounded={rounded} />
          <Button title="Highlight" onPress={() => setHighlight(!highlighted)} />
          <Button title="Round" onPress={() => setRounded(!rounded)} />
        </View>
        <Text style={[styles.title, styles.spacer]}>MobX Observable Styles</Text>
        <Text style={[styles.text, styles.spacer]}>
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
        <Text style={[styles.title, styles.spacer]}>useResponsive</Text>
        <Hook />
      </Content>
      <SelectBreakpoint />
    </View>
  )
}
