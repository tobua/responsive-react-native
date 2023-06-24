import {
  setBreakpoint,
  getBreakpoint,
  getBreakpoints,
  configure,
  createStyles,
  updateBreakpoint,
  reset,
} from 'responsive-react-native'
import { setWidth } from '../helper/general'

beforeEach(reset)

// Declaring Breakpoints will leak to all TS files shared with the current tsconfig context.
declare module 'responsive-react-native' {
  interface Breakpoints {
    tiny: number
    huge: number
  }
}

test('Can configure breakpoints.', () => {
  configure({
    breakpoints: {
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

test('Breakpoints can be used in Stylesheet.', () => {
  setWidth(200) // => tiny
  updateBreakpoint()

  configure({
    breakpoints: {
      tiny: 300,
      huge: 999,
    },
  })

  const styles = createStyles({
    wrapper: {
      backgroundColor: { tiny: 'red' },
      margin: { huge: 10 },
      flex: {
        // @ts-expect-error
        small: 1,
        tiny: 0,
      },
      color: { tiny: 'green', huge: 'blue' },
    },
    text: { fontSize: { tiny: 20, huge: 40 }, borderWidth: 40 },
  })

  expect(styles.wrapper.color).toBe('green')
  expect(styles.wrapper.backgroundColor).toBe('red')
  expect(styles.wrapper.margin).toBe(undefined) // Applicable breakpoint is missing.
  expect(styles.wrapper.flex).toBe(0)
  expect(styles.text.fontSize).toBe(20)
})

test('Breakpoint types can be extended and are properly typed.', () => {
  configure({
    breakpoints: {
      tiny: 300,
      // @ts-expect-error
      small: 123,
      huge: 999,
    },
  })

  configure({
    breakpoints: {
      tiny: 300,
      // @ts-expect-error
      nonExisting: 123,
      huge: 999,
    },
  })

  configure({
    breakpoints: {
      // @ts-expect-error
      tiny: '300',
    },
  })

  configure({
    // @ts-expect-error
    breakpoints: {
      tiny: 300,
    },
  })

  expect(true).toBe(true) // Only checking types.
})
