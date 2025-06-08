import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,  Route, Routes} from 'react-router'
import Layout from './Layout.jsx'
import Leetcode from './components/Leetcode.jsx'
import Codeforces from './components/Codeforces.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Leetcode />} />
          <Route path="codeforces" element={<Codeforces />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
