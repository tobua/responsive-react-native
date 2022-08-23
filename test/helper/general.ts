import { Dimensions } from 'react-native'

export const setWidth = (width: number) =>
  // @ts-ignore
  Dimensions.get.mockReturnValue({ width, height: 800, scale: 1, fontScale: 1 })
