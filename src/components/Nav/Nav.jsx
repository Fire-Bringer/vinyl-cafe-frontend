const Navbar = () => {
  return (
    <div className="w-full h-[90px] relative z-50">
      <div className="w-full h-[90px] left-0 top-0 bg-secondary flex justify-between">
        <img
          src='/icons/vinyl-icon.svg'
          alt='Vinyl Icon'
          width={40}
          className="ml-6"
        />
        <img
          src='/icons/burger-icon.svg'
          alt='Burger menu icon'
          width={40}
          className="mr-6"
        />
      </div>
    </div>
  );
};

export default Navbar;
