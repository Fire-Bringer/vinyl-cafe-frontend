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

import { useEffect } from 'react';

function Homepage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div>
      <Navbar/>
      <Hero/>
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
    </div>
  );
};

export default Homepage;
