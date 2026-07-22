import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Features from './components/Features'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import { ScrollProgressBar, SideDots } from './components/ScrollUI'
import WhatsappFab from './components/WhatsappFab'
import { useSmoothScroll } from './hooks/useSmoothScroll'

const isKnownRoute = ['', '/', '/index.html'].includes(
  window.location.pathname,
)

export default function App() {
  useSmoothScroll()

  if (!isKnownRoute) return <NotFound />

  return (
    <>
      <ScrollProgressBar />
      <SideDots />
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  )
}
