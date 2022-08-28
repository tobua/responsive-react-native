import { configure, getValue } from 'responsive-react-native'
import { setWidth } from './helper/general'

const expectValuesForSeveralScales = (
  value: number,
  fullResult: number,
  halfResult: number,
  noneResult: number
) => {
  configure({
    scale: {
      minimum: 320,
      maximum: 640,
      factor: 1,
    },
  })

  expect(getValue(value)).toBe(fullResult)

  configure({
    scale: {
      minimum: 320,
      maximum: 640,
      factor: 0.5,
    },
  })

  expect(getValue(value)).toBe(halfResult)

  configure({
    scale: {
      minimum: 320,
      maximum: 640,
      factor: 0,
    },
  })

  expect(getValue(value)).toBe(noneResult)
}

test('Correct scale values for various screen widths.', () => {
  setWidth(320)
  expectValuesForSeveralScales(10, 5, 8, 10)

  setWidth(640)
  expectValuesForSeveralScales(10, 15, 13, 10)

  setWidth(480)
  expectValuesForSeveralScales(10, 10, 10, 10)

  setWidth(400)
  expectValuesForSeveralScales(10, 8, 9, 10)

  setWidth(560)
  expectValuesForSeveralScales(10, 13, 11, 10)
})

test("Zero values aren't scaled and negative values are scaled properly.", () => {
  setWidth(320)
  expectValuesForSeveralScales(0, 0, 0, 0)

  setWidth(320)
  expectValuesForSeveralScales(-10, -5, -7, -10)
})
