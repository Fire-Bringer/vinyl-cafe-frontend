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
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Handle hero completion
  const handleHeroComplete = () => {
    setHeroLoaded(true);
  };

  // Safety timeout to ensure content eventually shows even if Hero fails
  useEffect(() => {
    // A safety valve that shows content after max 10s regardless of Hero status
    const safetyTimer = setTimeout(() => {
      if (!showContent) {
        console.log('Safety timeout triggered - forcing content display');
        setShowContent(true);
      }
    }, 7000);

    return () => clearTimeout(safetyTimer);
  }, [showContent]);

  // Track heroLoaded and trigger content display
  useEffect(() => {
    if (heroLoaded) {
      // Small delay to ensure smooth transition after hero animation
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500); // Short delay for smooth transition

      return () => clearTimeout(timer);
    }
  }, [heroLoaded]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar/>
      {/* Pass the callback to Hero component */}
      <Hero onComplete={handleHeroComplete} />

      {showContent && (
        <>
          {/* Above-the-fold content loads first */}
          <Suspense fallback={<LoadingFallback />}>
            <Tags/>
            <Latest/>
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Break/>
            <About/>
          </Suspense>

          {/* Image-heavy components get their own boundaries */}
          <Suspense fallback={<LoadingFallback />}>
            <Events/>
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Menu/>
            <Break2/>
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Gallery/>
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Access/>
            <Footer/>
          </Suspense>
        </>
      )}
    </div>
  );
}

// Helper component for cleaner code
function LoadingFallback() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default Homepage;
