import { styled, theme } from '../stitches.config'
import { Link } from './Link'

const PositionRight = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.space.large,
})

const Wrapper = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 133, 250, 0.3)', // Interact color with alpha.
  gap: theme.space.small,
  padding: theme.space.medium,
})

const Description = styled('p', {
  margin: 0,
  fontFamily: 'sans-serif',
})

const PageTitle = styled('div', {
  fontSize: 24,
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
})

export const NextPage = ({ name, href }) => {
  return (
    <PositionRight>
      <Wrapper>
        <Description>Continue Reading</Description>
        <Link href={href}>
          <PageTitle>{name}</PageTitle>
        </Link>
      </Wrapper>
    </PositionRight>
  )
}
