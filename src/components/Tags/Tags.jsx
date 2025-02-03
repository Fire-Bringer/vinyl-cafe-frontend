const Tags = () => {
  return (
    <div className="w-full h-[100px] bg-secondary flex justify-around items-center text-primary font-body text-xs">

      <div className="flex flex-col items-center">
        <img src="icons/cup-icon.svg" alt="Cup Icon" width={30} />
        <h6>Cozy Cafe</h6>
      </div>
      <div className="flex flex-col items-center">
        <img src="icons/disk-icon.svg" alt="Vinyl Icon" width={30} />
        <h6>Vinyl Shop</h6>
      </div>
      <div className="flex flex-col items-center">
        <img src="icons/music-icon.svg" alt="Music Icon" width={30} />
        <h6>Live Music</h6>
      </div>

    </div>
  );
};

export default Tags;
