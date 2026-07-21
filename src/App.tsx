import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Features from './components/Features'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ScrollProgressBar, SideDots } from './components/ScrollUI'
import WhatsappFab from './components/WhatsappFab'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()
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
