import { Dimensions } from 'react-native'

jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 420, height: 800, scale: 1, fontScale: 1 })
