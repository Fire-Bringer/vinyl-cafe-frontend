import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Tags from '@/components/Tags/Tags';
import Latest from '@/components/Latest/Latest';
import Footer from '@/components/Footer/Footer';

function Homepage() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Tags/>
      <Latest/>
      <Footer/>
    </div>
  );
};

export default Homepage;
