'use client';
import { useEffect, useState, lazy, Suspense, useRef } from 'react';
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

// Custom hook for intersection observer
function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Update state when element enters viewport
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once loaded, no need to keep observing
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
}

// Component wrapper for lazy loading on scroll
function LazyLoadSection({ children, threshold = 0.1, rootMargin = "200px" }) {
  const sectionRef = useRef(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold, rootMargin });

  return (
    <div ref={sectionRef} className="w-full">
      {isVisible ? children : <LoadingPlaceholder />}
    </div>
  );
}

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

          <LazyLoadSection>
            <Suspense fallback={<LoadingFallback />}>
              <Break/>
              <About/>
            </Suspense>
          </LazyLoadSection>

          <LazyLoadSection rootMargin="300px">
            <Suspense fallback={<LoadingFallback />}>
              <Events/>
            </Suspense>
          </LazyLoadSection>

          <LazyLoadSection>
            <Suspense fallback={<LoadingFallback />}>
              <Menu/>
              <Break2/>
            </Suspense>
          </LazyLoadSection>

          <LazyLoadSection>
            <Suspense fallback={<LoadingFallback />}>
              <Gallery/>
            </Suspense>
          </LazyLoadSection>

          <LazyLoadSection>
            <Suspense fallback={<LoadingFallback />}>
              <Access/>
              <Footer/>
            </Suspense>
          </LazyLoadSection>
        </>
      )}
    </div>
  );
}

// Helper component for cleaner code
function LoadingFallback() {
  return (
    <div className="loading-container py-20 flex justify-center items-center">
      <div className="loading-spinner"></div>
    </div>
  );
}

// Simple placeholder that takes space but doesn't require resources
function LoadingPlaceholder() {
  return (
    <div className="py-20 w-full animate-pulse bg-background-800/10" />
  );
}

export default Homepage;
