import { styled, theme } from '../stitches.config'
import { Center, Content } from './General'

const Title = styled('div', {
  fontSize: 50,
  fontWeight: 'bold',
  fontFamily: 'serif',
  textAlign: 'center',
  marginBottom: theme.space.large,
  background: '-webkit-linear-gradient(90deg, #FF85FA, #82D9FF)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
})

const Description = styled('div', {
  fontFamily: 'sans-serif',
  paddingLeft: '20%',
  paddingRight: '20%',
  textAlign: 'center',
})

export const StyledIntro = () => (
  <Center>
    <Content>
      <a id="styled">
        <Title>Styled API</Title>
      </a>
      <Description>
        Guaranteed to take the React Native development experience to the next level the Styled API
        especially <strong>removes the need for any rerenders</strong> when the styles should
        change.
      </Description>
    </Content>
  </Center>
)
