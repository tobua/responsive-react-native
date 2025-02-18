import { useState } from 'react'
import { Configuration } from './page/configuration'
import { Features } from './page/features'
import { GettingStarted } from './page/getting-started'
import { Overview } from './page/overview'
import { Styled } from './page/styled'

const assetPrefix = '/responsive-react-native'
let _setRoute

const pages = {
  [`${assetPrefix}/`]: <Overview />,
  [`${assetPrefix}/styled`]: <Styled />,
  [`${assetPrefix}/getting-started`]: <GettingStarted />,
  [`${assetPrefix}/features`]: <Features />,
  [`${assetPrefix}/configuration`]: <Configuration />,
}

export const go = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, route: string) => {
  const fullRoute = `${assetPrefix}/${route}`
  event.preventDefault()
  window.history.pushState({}, undefined, fullRoute)
  _setRoute(fullRoute)
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
