import { SandpackProvider, SandpackCodeViewer } from '@codesandbox/sandpack-react'

export const Code = ({ children, backgroundColor = 'white' }) => (
  <SandpackProvider
    style={{ flexBasis: '50%' }}
    template="react"
    files={{
      '/App.js': children,
    }}
  >
    <SandpackCodeViewer style={{ backgroundColor }} />
  </SandpackProvider>
)
