const Footer = () => {
  return (
    <div className="w-full relative bg-secondary">
      <div className="flex flex-col pt-16 mx-52">
        <div className="footer-links flex justify-between border-y-2 border-y-primary">
          <h6 className="text-primary text-lg font-medium font-body leading-7 p-4">
            Contact
          </h6>

          <h6 className="text-primary text-lg font-medium font-body leading-7 p-4 w-1/2 flex justify-around">
            <a href="#">Home</a>
            <a href="#">Latest</a>
            <a href="#">About</a>
            <a href="#">Events</a>
            <a href="#">Menu</a>
            <a href="#">Gallery</a>
            <a href="#">Access</a>
          </h6>
        </div>

        <div className="footer-content flex justify-between py-12">

          <div className="w-1/2 grid grid-cols-2 grid-rows-3 items-center p-4">
            <div className="row-start-1 col-span-2 text-primary text-2xl font-normal font-display leading-loose">
              Melting Pot Coffee & Bar
            </div>

            <div className="row-start-2 col-start-1 text-primary text-xs font-normal font-body leading-[18px]">777 - 7777</div>

            <div className="row-start-2 col-start-2 text-primary text-xs font-normal font-body leading-[18px]">TEL: 777-777-7777</div>

            <div className="row-start-3 col-start-1 text-primary text-xs font-normal font-body leading-[18px]">7-77-77 Dopeland Kanazawa </div>

            <div className="row-start-3 col-start-2 text-primary text-xs font-normal font-body leading-[18px]">EMAIL: cafe@vinyl.com7-777-7777</div>

          </div>

          <div className="self-center p-4">
            <img
              src="icons/vinyl-icon.svg"
              alt="Vinyl Icon"
              className="w-20"
            />
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
