import { createRoot } from 'react-dom/client'
import { Static } from './markup/static'
import { Router } from './router'

document.body.innerHTML = ''

createRoot(document.body).render(
  <Static>
    <Router />
  </Static>,
)
