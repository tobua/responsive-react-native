import { styled, theme } from '../stitches.config'
import { ContentGrid } from './General'
import { Code } from './Code'

const Title = styled('h1', {
  fontSize: 50,
  fontWeight: 'bold',
  fontFamily: 'serif',
  textAlign: 'center',
  margin: 0,
  background: '-webkit-linear-gradient(90deg, #FF85FA, #82D9FF)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
})

const Description = styled('div', {
  fontFamily: 'sans-serif',
  paddingLeft: '20%',
  paddingRight: '20%',
  textAlign: 'center',
  margin: 0,
  marginBottom: theme.space.medium,
})

const SubTitle = styled('h2', {
  fontSize: 24,
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  margin: 0,
})

const DescriptionSmall = styled('p', {
  fontFamily: 'sans-serif',
  marginBottom: theme.space.medium,
  margin: 0,
})

export const StyledIntro = () => (
  <ContentGrid>
    <a id="styled">
      <Title>Styled API</Title>
    </a>
    <Description>
      Guaranteed to take the React Native development experience to the next level the Styled API
      especially <strong>removes the need for any rerenders</strong> when the styles change.
    </Description>
    <Code backgroundColor="black" theme="dark">{`import { Styled } from 'responsive-react-native'

const CustomView = Styled(
  'View',
  {
    backgroundColor: 'gray',
    padding: 10,
  },
  {
    // Truthy prop.
    highlight: {
      backgroundColor: 'red',
    }
  }
)

export default () => <CustomView highlight />`}</Code>
    <SubTitle>Observable Styles with MobX</SubTitle>
    <DescriptionSmall>
      When a function is passed and MobX is installed the styles will automatically adapt whenever
      any of the state accessed inside changes.
    </DescriptionSmall>
    <Code backgroundColor="black" theme="dark">{`import { observable } from 'mobx'
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
)`}</Code>
  </ContentGrid>
)
