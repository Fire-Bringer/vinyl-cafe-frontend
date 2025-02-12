import Image from "next/image";
import FileIcon from "../SVGs/File-icon";

const Menu = () => {
  return (
    <section id="Menu" className="flex flex-col justify-center items-center pb-16">

      {/* Menu Heading */}
      <h2 className="font-display text-4xl">Menu</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-3 grid-rows-2 w-full md:w-4/5 xl:w-1/2 mt-4">

        <div>
          <Image
            src="/menu/best1.webp"
            alt="Menu item image 1"
            width={900}
            height={900}
            className="col-start-1 row-start-1"
          />
        </div>

        <div>
          <Image
            src="/menu/best2.webp"
            alt="Menu item image 2"
            width={900}
            height={900}
            className="col-start-2 row-start-1"
          />
        </div>

        <div>
          <Image
            src="/menu/best4.webp"
            alt="Menu item image 4"
            width={900}
            height={900}
            className="col-start-3 row-start-1"
          />
        </div>

        <div>
          <Image
            src="/menu/best5.webp"
            alt="Menu item image 5"
            width={900}
            height={900}
            className="col-start-1 row-start-2"
          />
        </div>

        <div>
          <Image
            src="/menu/coffee_logo.webp"
            alt="Coffee image"
            width={900}
            height={900}
            className="col-start-2 row-start-2"
          />
        </div>

        <div>
          <Image
            src="/menu/dessert.webp"
            alt="Dessert image"
            width={900}
            height={900}
            className="col-start-3 row-start-2"
          />
        </div>


      </div>

      {/* Description */}
      <p className="font-body text-base w-4/5 md:w-3/5 xl:w-1/4 mt-4">Menu description with a good number of words which will fill up this text box. It is my hope the this lorem will do its job properly. </p>

      {/* Links */}
      <div className="flex gap-2 mt-4">
        <FileIcon/>
        <h6>PDF MENU</h6>
      </div>


    </section>
  );
};

export default Menu;
