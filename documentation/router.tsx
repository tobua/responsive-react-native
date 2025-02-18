import { useState } from 'react'
import { Overview } from './page/overview'
import { Styled } from './page/styled'
import { GettingStarted } from './page/getting-started'
import { Features } from './page/features'
import { Configuration } from './page/configuration'

let _setRoute

const pages = {
  '/': <Overview />,
  '/styled': <Styled />,
  '/getting-started': <GettingStarted />,
  '/features': <Features />,
  '/configuration': <Configuration />,
}

export const go = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, route: string) => {
  event.preventDefault()
  window.history.pushState({}, undefined, route)
  _setRoute(route)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onPopState = (event) => {
  event.preventDefault()
  const currentRoute = window.location.pathname
  _setRoute(currentRoute)
}

window.addEventListener('popstate', onPopState)

export function Router() {
  const [route, setRoute] = useState(window.location.pathname)

  _setRoute = setRoute

  if (pages[route]) {
    return pages[route]
  }

  return <p>Page not found</p>
}
