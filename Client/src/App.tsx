import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Quote from './pages/Quote';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:shadow"
      >
        Skip to main content
      </a>
      <div className="bg-white text-gray-900 font-sans">
        <Navbar />
        <main id="main-content" role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;