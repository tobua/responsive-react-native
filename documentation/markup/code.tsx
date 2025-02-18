import { SandpackCodeEditor, SandpackCodeViewer, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { Scroll } from 'overflow-scroll-fade'

export const Code = ({ children, backgroundColor = 'white', theme = 'light' }) => (
  <div style={{ overflow: 'hidden' }}>
    <style>{'.sp-wrapper { flex: 1 }'}</style>
    <Scroll direction="horizontal">
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
    </Scroll>
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
          <Scroll direction="horizontal">
            <SandpackCodeEditor />
          </Scroll>
        </div>
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  </div>
)
