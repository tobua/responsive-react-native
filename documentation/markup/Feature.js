import { styled, theme } from '../stitches.config'

const Wrapper = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '50%',
  gap: theme.space.medium,
})

const Title = styled('div', {
  fontSize: 24,
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  color: theme.color.white,
})

const Description = styled('div', {
  fontFamily: 'sans-serif',
  color: theme.color.white,
})

export const Feature = ({ Icon, title, description }) => {
  return (
    <Wrapper>
      {Icon && <Icon size={70} />}
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  )
}
