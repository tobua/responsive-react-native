import { setBreakpoint, getBreakpoint, getBreakpoints, configure } from 'responsive-react-native'

test('Can configure breakpoints.', () => {
  configure({
    breakpoints: { tiny: 300, huge: 999 },
  })

  const Breakpoints = getBreakpoints()

  expect(Object.keys(Breakpoints)).toEqual(['tiny', 'huge'])
  expect(getBreakpoint()).toBe('tiny')

  setBreakpoint('huge')

  expect(getBreakpoint()).toBe('huge')
})

test('Can configure initial breakpoint.', () => {
  configure({
    breakpoints: { small: 300, medium: 400, large: 999 },
    breakpoint: 'large',
  })

  expect(getBreakpoint()).toBe('large')

  configure({
    breakpoint: 'small',
  })

  expect(getBreakpoint()).toBe('small')

  configure({
    breakpoints: { tiny: 300, huge: 999 },
    breakpoint: 'huge',
  })

  expect(Object.keys(getBreakpoints())).toEqual(['tiny', 'huge'])

  expect(getBreakpoint()).toBe('huge')
})
