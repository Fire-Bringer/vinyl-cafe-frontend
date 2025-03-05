'use client';
import { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar/Navbar.js';
import Hero from '@/components/Hero/Hero';

// Lazy loaded components
const Tags = lazy(() => import('@/components/Tags/Tags'));
const Latest = lazy(() => import('@/components/Latest/Latest'));
const Break = lazy(() => import('@/components/Break/Break'));
const About = lazy(() => import('@/components/About/About'));
const Events = lazy(() => import('@/components/Events/Events'));
const Menu = lazy(() => import('@/components/Menu/Menu'));
const Break2 = lazy(() => import('@/components/Break/Break2'));
const Gallery = lazy(() => import('@/components/Gallery/Gallery'));
const Access = lazy(() => import('@/components/Access/Access'));
const Footer = lazy(() => import('@/components/Footer/Footer'));

function Homepage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount

    // Delay loading of other components until Hero animation completes
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 7000); // Match this with your Hero animation duration (7 seconds based on navbar delay)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navbar/>
      <Hero/>

      {showContent && (
        <Suspense fallback={
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        }>
          <Tags/>
          <Latest/>
          <Break/>
          <About/>
          <Events/>
          <Menu/>
          <Break2/>
          <Gallery/>
          <Access/>
          <Footer/>
        </Suspense>
      )}
    </div>
  );
}

export default Homepage;
