import { Dimensions } from 'react-native'
import { autorun } from 'mobx'

// @ts-ignore
global.autorun = autorun

jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 420, height: 800, scale: 1, fontScale: 1 })
