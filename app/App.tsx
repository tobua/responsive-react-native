import React, { useState, useCallback } from 'react'
import { View, Text, Dimensions, Platform, Image } from 'react-native'
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
import logo from './logo.png'
import { Expandable } from './Expandable'

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
  logo: {
    width: 32,
    height: 60,
    marginRight: 20,
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
  adaptiveView: {
    padding: { small: 10, medium: 20, large: 30 },
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: { small: 'lightblue', medium: 'blue', large: 'dodgerblue' },
    borderWidth: [3, 6],
    borderColor: ['blue', 'red'],
  },
  adaptiveText: {
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
  selectBreakpoint: {
    marginHorizontal: 50,
  },
})

function NestedBreakpoint() {
  return (
    <Text style={[styles.annotation]}>
      Breakpoint: <Text style={styles.breakpoint}>{getBreakpoint()}</Text> Orientation:{' '}
      <Text style={styles.orientation}>{getOrientation()}</Text>
    </Text>
  )
}

function Header() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={logo} />
      <View>
        <Text style={styles.heading}>responsive-react-native</Text>
        <Text style={styles.annotation}>
          Width: {Dimensions.get('screen').width}px Scale: {Dimensions.get('screen').scale}{' '}
          FontScale: {Dimensions.get('screen').fontScale}
        </Text>
        <NestedBreakpoint />
      </View>
    </View>
  )
}

const ButtonWrapper = Styled('TouchableOpacity', {
  padding: Platform.OS === 'ios' ? 0 : 5,
  borderRadius: Platform.OS === 'ios' ? 0 : 5,
  backgroundColor: Platform.OS === 'ios' ? 'white' : '#2196F3',
  marginLeft: 10,
})

const ButtonText = Styled('Text', {
  fontSize: 14,
  color: Platform.OS === 'ios' ? '#007AFF' : 'white',
})

function Button({ onPress, title }: { onPress: Function; title: string }) {
  return (
    <ButtonWrapper onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonWrapper>
  )
}

const sizeToColsMap = {
  small: 5,
  medium: 4,
  large: 3,
}

const Content = Styled('ScrollView', {
  paddingLeft: 20,
  paddingRight: 20,
  width: '100%',
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
  const [openExpandable, setOpenExpandable] = useState([1, 2])
  const toggleExpandable = useCallback(
    (key: number) => {
      if (openExpandable.includes(key)) {
        setOpenExpandable(openExpandable.filter((item) => item !== key))
      } else {
        setOpenExpandable([...openExpandable, key])
      }
    },
    [openExpandable, setOpenExpandable]
  )

  return (
    <View style={styles.screen}>
      <Content>
        <Rerender style={styles.wrapper}>
          {() => (
            <>
              <Header />
              <Text style={[styles.text, styles.spacer]}>
                This plugin allows you to scale text and any arbitrary sizes according to the size
                specified.
              </Text>
              <Expandable
                title="Responsive Values"
                open={openExpandable.includes(1)}
                onToggle={() => toggleExpandable(1)}
              >
                <Text style={[styles.text, styles.spacer]}>
                  Regular numeric stylesheet values like padding are automatically scaled.
                </Text>
                <View style={styles.exampleView}>
                  <Text style={styles.exampleText}>Hello Responsive World</Text>
                </View>
              </Expandable>
              <Expandable
                title="Adaptive Values"
                open={openExpandable.includes(2)}
                onToggle={() => toggleExpandable(2)}
              >
                <Text style={[styles.text, styles.spacer]}>
                  The plugin can pick values based on the current breakpoint and orientation.
                </Text>
                <View style={styles.adaptiveView}>
                  <Text style={styles.adaptiveText}>Hello Adaptive World</Text>
                </View>
              </Expandable>
              <Expandable
                title="Breakpoint-Based Grid"
                open={openExpandable.includes(3)}
                onToggle={() => toggleExpandable(3)}
              >
                <Text style={[styles.text, styles.spacer]}>
                  During render the current breakpoint can be accessed to render elements
                  accordingly.
                </Text>
                <Cols cols={sizeToColsMap[getBreakpoint() as 'small' | 'medium' | 'large']}>
                  <Col style={styles.col}>
                    <View />
                  </Col>
                  <Col style={styles.col}>
                    <View />
                  </Col>
                  <Col style={styles.col}>
                    <View />
                  </Col>
                  <Col style={styles.col}>
                    <View />
                  </Col>
                  <Col style={styles.col}>
                    <View />
                  </Col>
                </Cols>
              </Expandable>
            </>
          )}
        </Rerender>
        <Expandable
          title="Styled-Like Interface"
          open={openExpandable.includes(4)}
          onToggle={() => toggleExpandable(4)}
        >
          <Text style={[styles.text, styles.spacer]}>
            This interface doesn't require any rerenders and works well to assign props based
            styles.
          </Text>
          <View style={[styles.row, styles.spacer]}>
            <CustomView highlight={highlighted} rounded={rounded} />
            <Button title="Highlight" onPress={() => setHighlight(!highlighted)} />
            <Button title="Round" onPress={() => setRounded(!rounded)} />
          </View>
        </Expandable>
        <Expandable
          title="MobX Observable Styles"
          open={openExpandable.includes(5)}
          onToggle={() => toggleExpandable(5)}
        >
          <Text style={[styles.text, styles.spacer]}>
            When MobX observables are used to generate the styles they will automatically update
            when the state changes.
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
        </Expandable>
        <Expandable
          title="useResponsive"
          open={openExpandable.includes(6)}
          onToggle={() => toggleExpandable(6)}
        >
          <Hook />
        </Expandable>
      </Content>
      <SelectBreakpoint style={styles.selectBreakpoint} />
    </View>
  )
}
