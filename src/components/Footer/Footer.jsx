const Footer = () => {
  return (
    <div className="w-full relative bg-secondary">
      <div className="flex flex-col pt-16 mx-[10vw]">
        <div className="footer-links flex justify-center lg:justify-between border-y-2 border-y-primary">
          <h6 className="text-primary text-lg font-medium font-body leading-7 p-4 hidden lg:block">
            Contact
          </h6>

          <h6 className="text-primary text-lg font-medium font-body leading-10 lg:leading-7 p-4 w-2/3 flex flex-col lg:flex-row items-center justify-around">
            <a href="#">Home</a>
            <a href="#">Latest</a>
            <a href="#">About</a>
            <a href="#">Events</a>
            <a href="#">Menu</a>
            <a href="#">Gallery</a>
            <a href="#">Access</a>
          </h6>
        </div>

        <div className="footer-content flex flex-col lg:flex-row justify-between py-12">

          <div className="text-center lg:text-start lg:w-6/10 lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:items-center p-4">
            <div className="lg:row-start-1 lg:col-span-2 text-primary text-2xl font-normal font-display leading-loose">
              Vinyl Cafe
            </div>

            <div className="lg:row-start-2 lg:col-start-1 text-primary text-xs font-normal font-body leading-relaxed">777 - 7777</div>

            <div className="lg:row-start-2 lg:col-start-2 text-primary text-xs font-normal font-body leading-relaxed">TEL: 777-777-7777</div>

            <div className="lg:row-start-3 lg:col-start-1 text-primary text-xs font-normal font-body leading-relaxed">7-77-77 Dopeland Kanazawa </div>

            <div className="lg:row-start-3 lg:col-start-2 text-primary text-xs font-normal font-body leading-relaxed">EMAIL: cafe@vinyl.com7-777-7777</div>

          </div>

          <div className="flex justify-center md:gap-8 lg:gap-0">

            <div className="self-center p-4">
              <img
                src="icons/ig-icon.svg"
                alt="Vinyl Icon"
                className="w-20"
                />
            </div>

            <div className="self-center p-4">
              <img
                src="icons/yt-icon.svg"
                alt="Vinyl Icon"
                className="w-20"
                />
            </div>

          </div>

        </div>

        <div className="footer-copywrite border-t-2  border-t-primary py-4">
          <div className="text-center text-primary text-xs font-normal font-body">
            &copy; 2025 Rashad DuPaty
          </div>
        </div>

      </div>

    </div>
  );
};

export default Footer;
