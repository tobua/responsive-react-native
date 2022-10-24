import { useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'
import Select from 'react-select'
import { deviceSizes } from 'device-sizes'
import { styled, theme } from '../stitches.config'
import { PhoneCutout } from './PhoneCutout'

const Wrapper = styled('section', {
  display: 'flex',
  alignItems: 'center',
  height: '80vh',
})

const EditorWrapper = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Preview = styled('div', {
  marginLeft: theme.space.medium,
})

const Phone = styled('div', {
  border: '10px solid black',
  background: 'black',
  borderRadius: 10,
  height: 600,
})

const PhoneInner = styled('div', {
  position: 'relative',
  borderRadius: 5,
  background: 'white',
  height: '100%',
  padding: theme.space.small,
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

export const Repl = () => {
  const [phone, setPhone] = useState(deviceSizes['iphone14'])
  return (
    <Wrapper>
      <style>{`.sp-wrapper { width: 100%; }
.sp-layout { background-color: initial; border: initial; width: 100%; }
.sp-editor { border: 1px solid var(--sp-colors-surface2); border-radius: 5px; }
.sp-tabs { background: initial; }
.sp-code-editor { background: initial; }
.cm-editor { background-color: initial !important; }
.sp-preview { height: 100%; background-color: initial; }
.sp-preview-container { background: initial; }`}</style>
      <SandpackProvider
        template="react"
        files={{
          '/App.js': `import { View, Text } from 'react-native'
import { createStyles } from 'responsive-react-native'
import { Scale } from './scale.js'

const styles = createStyles({
  view: {
    backgroundColor: 'red',
    width: 200,
    height: 100,
    padding: 10
  },
  title: {
    fontSize: 20
  }
})

export default function App() {
  return (
    <View>
      <Text style={styles.title}>Hello World</Text>
      <Scale />
      <View style={styles.view}>
        <Text>hello</Text>
      </View>
    </View>
  )
}`,
          '/scale.js': `export function Scale() {
  return <p>scale</p>
}`,
        }}
        customSetup={{
          dependencies: {
            'react-native-web': 'latest',
            'responsive-react-native': 'latest',
          },
        }}
      >
        <SandpackLayout>
          <EditorWrapper>
            <SandpackCodeEditor />
          </EditorWrapper>
          <Preview>
            <Select
              value={{ value: phone.id, label: phone.name }}
              onChange={(selected) => setPhone(deviceSizes[selected.value])}
              options={options}
              styles={{
                container: (provided) => ({
                  ...provided,
                  marginBottom: 20,
                  outline: 'none',
                  borderColor: 'initial',
                  zIndex: 999,
                }),
                // var(--sp-colors-surface2)
                control: (provided) => ({
                  ...provided,
                  borderColor: 'var(--sp-colors-surface2)',
                }),
                indicatorSeparator: () => ({
                  display: 'none',
                }),
                indicatorContainer: (provided) => ({
                  ...provided,
                  color: 'red',
                }),
              }}
            />
            <Phone>
              <PhoneInner>
                <PhoneCutout type={phone.camera} />
                <SandpackPreview />
              </PhoneInner>
            </Phone>
            <Label weight="bold">
              {phone.width} x {phone.height} <Scale>@{phone.scale}x</Scale>
            </Label>
            <Label>
              {phone.width / phone.scale} x {phone.height / phone.scale}
            </Label>
          </Preview>
        </SandpackLayout>
      </SandpackProvider>
    </Wrapper>
  )
}
