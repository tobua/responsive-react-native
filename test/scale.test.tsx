import { configure, getValue } from 'responsive-react-native'
import { setWidth } from './helper/general'

const expectValuesForSeveralScales = (
  fullResult: number,
  halfResult: number,
  noneResult: number
) => {
  configure({
    scale: {
      factor: 1,
    },
  })

  expect(getValue(10)).toBe(fullResult)

  configure({
    scale: {
      factor: 0.5,
    },
  })

  expect(getValue(10)).toBe(halfResult)

  configure({
    scale: {
      factor: 0,
    },
  })

  expect(getValue(10)).toBe(noneResult)
}

test('Correct scale values for various screen widths.', () => {
  setWidth(320)
  expectValuesForSeveralScales(5, 8, 10)

  setWidth(640)
  expectValuesForSeveralScales(15, 13, 10)

  setWidth(480)
  expectValuesForSeveralScales(10, 10, 10)

  setWidth(400)
  expectValuesForSeveralScales(8, 9, 10)

  setWidth(560)
  expectValuesForSeveralScales(13, 11, 10)
})
