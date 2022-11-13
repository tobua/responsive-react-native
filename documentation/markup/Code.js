import { SandpackProvider, SandpackCodeViewer } from '@codesandbox/sandpack-react'
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
