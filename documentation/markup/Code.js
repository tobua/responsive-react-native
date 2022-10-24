import { SandpackProvider, SandpackCodeViewer } from '@codesandbox/sandpack-react'

export const Code = ({ children, backgroundColor = 'white', theme = 'light' }) => (
  <SandpackProvider
    style={{ flexBasis: '50%' }}
    template="react"
    files={{
      '/App.js': children,
    }}
    theme={theme}
  >
    <SandpackCodeViewer style={{ backgroundColor }} />
  </SandpackProvider>
)
