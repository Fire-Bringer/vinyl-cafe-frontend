//import Navbar from '@/components/Navbar/Navbar';
import Navbar2 from '@/components/Navbar/Navbar.js';
import Hero from '@/components/Hero/Hero';
import Tags from '@/components/Tags/Tags';
import Latest from '@/components/Latest/Latest';
import Break from '@/components/Break/Break';
import About from '@/components/About/About';
import Events from '@/components/Events/Events';
import Menu from '@/components/Menu/Menu';
import Gallery from '@/components/Gallery/Gallery';
import Access from '@/components/Access/Access';
import Footer from '@/components/Footer/Footer';

function Homepage() {
  return (
    <div>
      {/* <Navbar/> */}
      <Navbar2/>
      <Hero/>
      <Tags/>
      <Latest/>
      <Break/>
      <About/>
      <Events/>
      <Menu/>
      <Gallery/>
      <Access/>
      <Footer/>
    </div>
  );
};

export default Homepage;
