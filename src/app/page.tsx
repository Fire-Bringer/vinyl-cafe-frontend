'use client';
import Navbar from '@/components/Navbar/Navbar.js';
import Hero from '@/components/Hero/Hero';
import Tags from '@/components/Tags/Tags';
import Latest from '@/components/Latest/Latest';
import Break from '@/components/Break/Break';
import About from '@/components/About/About';
import Events from '@/components/Events/Events';
import Menu from '@/components/Menu/Menu';
import Break2 from '@/components/Break/Break2';
import Gallery from '@/components/Gallery/Gallery';
import Access from '@/components/Access/Access';
import Footer from '@/components/Footer/Footer';

import { useEffect, useState } from 'react';

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
        <>
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
        </>
      )}
    </div>
  );
}

export default Homepage;
