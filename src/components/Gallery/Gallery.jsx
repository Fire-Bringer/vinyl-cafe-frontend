import Image from "next/image";

const Gallery = () => {
  return (
    <section id="Gallery" className="bg-background-600 flex flex-col place-items-center pt-20 pb-40">

      <h2 className="font-display text-4xl mt-4 md:mt-8">Gallery</h2>

      <div className="grid grid-col-2 grid-rows-3 w-[90%] xl:w-1/2 mt-4 md:mt-8 gap-4 xl:gap-12">

        <Image
          src="/gallery/best3.webp"
          alt="Menu item image 1"
          width={900}
          height={900}
          className="col-start-1 row-start-1 rounded-[20px] shadower"
        />

        <Image
          src="/gallery/gallery1.webp"
          alt="Menu item image 1"
          width={900}
          height={900}
          className="col-start-2 row-start-1 rounded-[20px] shadower"
        />

        <Image
          src="/gallery/gallery2.webp"
          alt="Menu item image 1"
          width={900}
          height={900}
          className="col-start-1 row-start-2 rounded-[20px] shadower"
        />

        <Image
          src="/gallery/gallery3.webp"
          alt="Menu item image 1"
          width={900}
          height={900}
          className="col-start-2 row-start-2 rounded-[20px] shadower"
        />

        <Image
          src="/gallery/gallery4.webp"
          alt="Menu item image 1"
          width={900}
          height={900}
          className="col-start-1 row-start-3 rounded-[20px] shadower"
        />

        <Image
          src="/gallery/gallery5.webp"
          alt="Menu item image 1"
          width={900}
          height={900}
          className="col-start-2 row-start-3 rounded-[20px] shadower"
        />

      </div>

    </section>
  );
};

export default Gallery;
