import { Dimensions } from 'react-native'

jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 480, height: 800, scale: 1, fontScale: 1 })
