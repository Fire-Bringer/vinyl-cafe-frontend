import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Tags from '@/components/Tags/Tags';
import Latest from '@/components/Latest/Latest';
import Break from '@/components/Break/Break';
import About from '@/components/About/About';
import Footer from '@/components/Footer/Footer';
import Events from '@/components/Events/Events';

function Homepage() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Tags/>
      <Latest/>
      <Break/>
      <About/>
      <Events/>
      <Footer/>
    </div>
  );
};

export default Homepage;
