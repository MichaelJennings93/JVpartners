import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Approach from './pages/Approach'
import Impact from './pages/Impact'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="approach" element={<Approach />} />
        <Route path="impact" element={<Impact />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
