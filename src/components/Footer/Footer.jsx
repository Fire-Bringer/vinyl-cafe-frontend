import { RiInstagramLine, RiYoutubeLine } from '@remixicon/react';

const Footer = () => {
  return (
    <footer className="w-full relative bg-secondary">
      <div className="w-4/5 mx-auto pt-16">
        <div className="footer-links flex justify-center lg:justify-between border-y-2 border-y-primary">
          <h6 className="text-primary text-lg font-medium font-body leading-7 p-4 hidden lg:block xl:w-1/2 w-1/3">
            Contact
          </h6>

          <h6 className="text-primary text-lg font-medium font-body leading-10 lg:leading-7 xl:w-1/2 w-2/3 flex flex-col lg:flex-row items-center justify-around py-4">
            <a href="#Home">Home</a>
            <a href="#Latest">Latest</a>
            <a href="#About">About</a>
            <a href="#Events">Events</a>
            <a href="#Menu">Menu</a>
            <a href="#Gallery">Gallery</a>
            <a href="#Access">Access</a>
          </h6>
        </div>

        <div className="footer-content flex flex-col lg:flex-row justify-between py-12">

          <div className="text-center lg:text-start lg:w-6/10 lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:items-center p-4">
            <div className="lg:row-start-1 lg:col-span-2 text-primary text-2xl font-normal font-display leading-loose">
              Vinyl Cafe
            </div>

            <div className="lg:row-start-2 lg:col-start-1 text-primary text-xs font-normal font-body leading-relaxed">777 - 7777</div>

            <div className="lg:row-start-2 lg:col-start-2 text-primary text-xs font-normal font-body leading-relaxed">TEL: 777-777-7777</div>

            <div className="lg:row-start-3 lg:col-start-1 text-primary text-xs font-normal font-body leading-relaxed">7-77-77 Kanazawa </div>

            <div className="lg:row-start-3 lg:col-start-2 text-primary text-xs font-normal font-body leading-relaxed">EMAIL: cafe@vinyl.com</div>

          </div>

          <div className="flex justify-center gap-8 lg:w-4/10">

            <div className="self-center text-primary">
              <RiInstagramLine width={48} height={48} />
            </div>

            <div className="self-center text-primary">
              <RiYoutubeLine width={48} height={48} />
            </div>

          </div>

        </div>

        <div className="footer-copywrite border-t-2  border-t-primary py-4">
          <div className="text-center text-primary text-xs font-normal font-body">
            &copy; 2025 Rashad DuPaty
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
