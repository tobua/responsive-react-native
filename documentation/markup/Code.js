import {
  SandpackProvider,
  SandpackCodeViewer,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'
import { Indicate } from 'indicate'

export const Code = ({ children, backgroundColor = 'white', theme = 'light' }) => (
  <Indicate horizontal theme={{ innerWrapper: { display: 'block' } }}>
    <SandpackProvider
      template="react"
      files={{
        '/App.js': children,
      }}
      theme={theme}
    >
      <span style={{ '--sp-colors-surface1': backgroundColor }}>
        <SandpackCodeViewer />
      </span>
    </SandpackProvider>
  </Indicate>
)

export const CodeRepl = ({ children, backgroundColor = 'white', theme = 'light' }) => (
  <div>
    <style>{`.sp-stack.sp-preview { height: auto; }`}</style>
    <Indicate horizontal theme={{ innerWrapper: { display: 'block' } }}>
      <SandpackProvider
        template="react"
        files={{
          '/App.js': children,
        }}
        theme={theme}
        customSetup={{
          dependencies: {
            'react-native-web': 'latest',
            'responsive-react-native': 'latest',
            mobx: 'latest',
          },
        }}
      >
        <SandpackLayout>
          <span style={{ '--sp-colors-surface1': backgroundColor }}>
            <SandpackCodeEditor />
          </span>
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </Indicate>
  </div>
)
