import { useCallback, useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from '@codesandbox/sandpack-react'
import Select from 'react-select'
import { deviceSizes, Type } from 'device-sizes'
import { styled, theme } from '../stitches.config'
import { PhoneCutout } from './PhoneCutout'
import { ContentGrid } from '../markup/General'

const Wrapper = styled('section', {
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.space.huge,
})

const EditorWrapper = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@phone': {
    display: 'none',
  },
})

const Preview = styled('div', {
  marginLeft: theme.space.medium,
  '@tablet': {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    marginLeft: 0,
    marginTop: theme.space.medium,
  },
})

const Phone = styled('div', {
  border: '10px solid black',
  background: 'black',
  borderRadius: 10,
})

const PhoneInner = styled('div', {
  position: 'relative',
  borderRadius: 5,
  background: 'white',
  height: '100%',
  padding: theme.space.small,
  paddingTop: theme.space.large,
})

const Label = styled('p', {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  variants: {
    weight: {
      bold: {
        fontWeight: 'bold',
      },
    },
  },
})

const Scale = styled('span', {
  fontFamily: 'monospace',
})

const options = Object.keys(deviceSizes).map((key) => ({
  value: key,
  label: deviceSizes[key].name,
}))

// useSandpack has to be wrapped by SandpackProvider.
const SandpackInner = ({ phone, setPhone }) => {
  const aspectRatioWidth = phone.width / phone.height
  const sizeHeight = phone.size
  const sizeWidth = phone.size * aspectRatioWidth
  const { sandpack } = useSandpack()

  const handlePhoneChange = useCallback((selected) => {
    const phone = deviceSizes[selected.value]

    Object.values(sandpack.clients).forEach((client) => {
      client.dispatch({ type: 'refresh' })
    })

    setPhone(phone)
  })

  return (
    <SandpackLayout>
      <EditorWrapper>
        <SandpackCodeEditor />
      </EditorWrapper>
      <Preview>
        <Select
          value={{ value: phone.id, label: phone.name }}
          onChange={handlePhoneChange}
          options={options}
          styles={{
            container: (provided) => ({
              ...provided,
              marginBottom: 20,
              outline: 'none',
              borderColor: 'initial',
              zIndex: 999,
            }),
            control: (provided, state) => ({
              ...provided,
              boxShadow: undefined,
              borderColor: state.isFocused ? 'black' : 'var(--sp-colors-surface2)',
              '&:hover': {
                borderColor: 'black',
              },
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
            indicatorContainer: (provided) => ({
              ...provided,
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected
                ? '#82D9FF'
                : state.isFocused
                ? '#FF85FA'
                : 'transparent',
              cursor: 'pointer',
              ':active': {
                backgroundColor: '#FF85FA',
              },
            }),
          }}
        />
        <Phone
          css={{
            width: sizeWidth * 100,
            height: sizeHeight * 100,
          }}
        >
          <PhoneInner>
            <PhoneCutout type={phone.camera} />
            <SandpackPreview width="100%" height="100%" showOpenInCodeSandbox={false} />
          </PhoneInner>
        </Phone>
        <Label weight="bold">
          {phone.width} x {phone.height} · {phone.size}"
        </Label>
        <Label>
          {phone.width / phone.scale} x {phone.height / phone.scale} <Scale>@{phone.scale}x</Scale>
        </Label>
      </Preview>
    </SandpackLayout>
  )
}

export const Repl = () => {
  const [phone, setPhone] = useState(deviceSizes['iphone14'])

  return (
    <ContentGrid size={phone.type === Type.Tablet ? 'ultrawide' : 'wide'}>
      <Wrapper>
        <style>{`.sp-wrapper { width: 100%; }
.sp-layout { background-color: initial; border: initial; width: 100%; display: flex; flex-wrap: nowrap; }
.sp-editor { border: 1px solid var(--sp-colors-surface2); border-radius: 5px; }
.sp-tabs { background: initial; }
.sp-stack { max-height: 500px; }
.sp-code-editor { background: initial; }
.cm-editor { background-color: initial !important; }
.sp-preview { height: 100%; background-color: initial; }
.sp-preview-iframe { height: 100%; }
.sp-preview-container { background: initial; }

@media only screen and (max-width: 1000px) {
  .sp-layout { flex-wrap: wrap; }
}`}</style>
        <SandpackProvider
          width="100%"
          height="100%"
          template="react"
          files={{
            '/App.js': `import { View, Text, Dimensions } from 'react-native'
import { createStyles } from 'responsive-react-native'
import { Header } from './components.js'
import { Scale } from './scale.js'

const styles = createStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  box: {
    display: 'inline-flex',
    padding: 10,
    backgroundColor: 'lightgray'
  },
  smallBox: {
    width: 100,
    height: 100
  },
  largeBox: {
    width: 150,
    height: 150
  }
})

export default function App() {
  return (
    <View>
      <Header />
      <Scale />
      <View>
      <View style={[styles.box, styles.smallBox]}>
        <Text>100x100</Text>
      </View>
      <View style={[styles.box, styles.largeBox]}>
        <Text>150x150</Text>
      </View>
      <Text>{Dimensions.get('window').width}</Text>
      </View>
    </View>
  )
}`,
            '/scale.js': `export function Scale() {
  return <p>scale</p>
}`,
            '/components.js': `import { View, Text, Dimensions } from 'react-native'
import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  box: {
    display: 'inline-flex',
    padding: 10,
    backgroundColor: 'lightgray'
  },
  smallBox: {
    width: 100,
    height: 100
  },
  largeBox: {
    width: 150,
    height: 150
  }
})

export const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>My Responsive App</Text>
    <Text>👤</Text>
  </View>
)`,
          }}
          customSetup={{
            dependencies: {
              'react-native-web': 'latest',
              'responsive-react-native': 'latest',
            },
          }}
        >
          <SandpackInner phone={phone} setPhone={setPhone} />
        </SandpackProvider>
      </Wrapper>
    </ContentGrid>
  )
}
