import { Feature } from './Feature'
import { Stylesheet, ScaledValues, AdaptiveValues, Breakpoints } from './Icon'
import { styled, theme } from '../stitches.config'

const Wrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.space.large,
})

export const Features = () => {
  return (
    <Wrapper>
      <Feature
        Icon={Stylesheet}
        title="Responsive StyleSheet"
        description="Quickly make an existing application responsive without any refactoring."
      />
      <Feature
        Icon={ScaledValues}
        title="Scaled Values"
        description="Quickly make an existing application responsive without any refactoring."
      />
      <Feature
        Icon={AdaptiveValues}
        title="Adaptive Values"
        description="Quickly make an existing application responsive without any refactoring."
      />
      <Feature
        Icon={Breakpoints}
        title="Breakpoints"
        description="Quickly make an existing application responsive without any refactoring."
      />
    </Wrapper>
  )
}
