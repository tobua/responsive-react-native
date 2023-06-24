import {
  setBreakpoint,
  getBreakpoint,
  getBreakpoints,
  configure,
  createStyles,
} from 'responsive-react-native'

// For tests of type overrides, see ./types/configuration.test.tsx

test('Can configure breakpoints.', () => {
  configure({
    breakpoints: {
      // @ts-expect-error
      tiny: 300,
      huge: 999,
    },
  })

  const Breakpoints = getBreakpoints()

  expect(Object.keys(Breakpoints)).toEqual(['tiny', 'huge'])
  expect(getBreakpoint()).toBe('tiny')

  setBreakpoint('huge')

  expect(getBreakpoint()).toBe('huge')
})

test('Can configure initial breakpoint.', () => {
  configure({
    breakpoints: {
      // @ts-expect-error
      tiny: 300,
      huge: 999,
    },
    breakpoint: 'huge',
  })

  expect(Object.keys(getBreakpoints())).toEqual(['tiny', 'huge'])

  expect(getBreakpoint()).toBe('huge')
})

test('Custom value method receives all parameters.', () => {
  const styles = createStyles({
    test: {
      width: 50,
      height: 10,
    },
  })

  const valueMock = jest.fn(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (value: number, breakpoint: string, orientation: 'portrait' | 'landscape') => value * 2
  )

  configure({
    breakpoint: 'custom',
    // @ts-ignore
    value: valueMock,
  })

  let readStyle = styles.test.width

  expect(readStyle).toBe(100)
  expect(valueMock).toHaveBeenCalled()
  expect(valueMock.mock.calls.length).toBe(1)
  expect(valueMock.mock.calls[0][0]).toBe(50)
  expect(valueMock.mock.calls[0][1]).toBe('custom')
  expect(valueMock.mock.calls[0][2]).toBe('portrait')

  readStyle = styles.test.height

  expect(readStyle).toBe(20)
  expect(valueMock).toHaveBeenCalled()
  expect(valueMock.mock.calls.length).toBe(2)
  expect(valueMock.mock.calls[1][0]).toBe(10)
  expect(valueMock.mock.calls[1][1]).toBe('custom')
  expect(valueMock.mock.calls[1][2]).toBe('portrait')
})
