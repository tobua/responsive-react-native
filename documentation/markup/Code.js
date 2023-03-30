import {
  SandpackProvider,
  SandpackCodeViewer,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'
import { Indicate } from 'indicate'

export const Code = ({ children, backgroundColor = 'white', theme = 'light' }) => (
  <div style={{ overflow: 'hidden' }}>
    <Indicate horizontal theme={{ element: { backgroundColor } }}>
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
  </div>
)

export const CodeRepl = ({ children, backgroundColor = 'white', theme = 'light' }) => (
  <div style={{ overflow: 'hidden' }}>
    <style>{`.sp-stack.sp-preview { height: auto; }
    .sp-code-editor { overflow: initial; }
    .sp-layout { background-color: ${backgroundColor}; }
    .cm-editor .cm-scroller { overflow-x: initial; }`}</style>
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
        <div style={{ overflow: 'hidden', '--sp-colors-surface1': backgroundColor }}>
          <Indicate horizontal theme={{ element: { backgroundColor } }}>
            <SandpackCodeEditor />
          </Indicate>
        </div>
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  </div>
)
