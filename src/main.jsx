import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/skills.css'
import './styles/projects.css'
import './styles/contact.css'
import './styles/footer.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
