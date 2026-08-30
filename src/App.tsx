import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Approach from './pages/Approach'
import Impact from './pages/Impact'
import Contact from './pages/Contact'
import Functions from './pages/Functions'
import TalentAcquisition from './pages/TalentAcquisition'
import OfferingPage from './pages/OfferingPage'
import { OFFERING_GROUPS } from './data/offerings'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        {OFFERING_GROUPS.map((g) => (
          <Route key={g.slug} path={`services/${g.slug}`} element={<OfferingPage group={g} />} />
        ))}
        <Route path="services/talent-acquisition" element={<TalentAcquisition />} />
        <Route path="functions" element={<Functions />} />
        <Route path="approach" element={<Approach />} />
        <Route path="impact" element={<Impact />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
