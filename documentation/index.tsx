import { Static } from './markup/static'
import { createRoot } from 'react-dom/client'
import { Router } from './router'

document.body.innerHTML = ''

createRoot(document.body).render(
  <Static>
    <Router />
  </Static>,
)
