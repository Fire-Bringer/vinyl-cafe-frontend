import Image from "next/image";
import FileIcon from "../SVGs/File-icon";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const Menu = () => {

  const modalContactRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close

  const openModal = () => {
    setIsModalOpen(true); // Set state first
  };

  const closeModal = () => {
    setIsModalOpen(false); // Set state first
  };

  useEffect(() => {
    if (isModalOpen) {
        gsap.to(modalContactRef.current, { scale: 1, opacity: 1, duration: 0.5, pointerEvents: "auto" });
    } else {
        // Only animate when isModalOpen becomes false *after* it has been true
        if (modalContactRef.current && modalContactRef.current.style.scale !== "0") {  // Check if it has been opened
            gsap.to(modalContactRef.current, { scale: 0, opacity: 0, duration: 0.5, pointerEvents: "none"});
        } else {
            // For the very first render, just set the styles directly (no animation)
            if (modalContactRef.current) {
                modalContactRef.current.style.scale = 0;
                modalContactRef.current.style.opacity = 0;
                modalContactRef.current.style.pointerEvents = "none";
            }
        }
    }
  }, [isModalOpen]);

  return (
    <section id="Menu" className="flex flex-col justify-center items-center py-16">

      {/* Menu Heading */}
      <h2 className="font-display text-4xl">Menu</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-3 grid-rows-2 w-full md:w-4/5 xl:w-1/2 2xl:w-2/5 mt-4">

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
      <button
        className="flex gap-2 mt-4"
        onClick={() => openModal()}
      >
        <FileIcon/>
        <h6>PDF MENU</h6>
      </button>

      {/* Modal */}
      <div
        ref={modalContactRef}
        className={`fixed top-0 left-0 w-full h-full bg-secondary/80 z-50 flex items-center justify-center transition-opacity duration-500 ${isModalOpen ? 'flex' : 'hidden'}`} // Use state for classes
        onClick={(e) => { // Close only if click is directly on the backdrop
          if (e.target === modalContactRef.current) {
            closeModal();
          }
        }}
      >
        {isModalOpen && (
          <Image
            onClose={closeModal} // Pass the closeModal function as a prop
            onClick={(e) => e.stopPropagation()} // Keep this!
            className="bg-background-600 rounded-[20px] p-4 overflow-hidden"
            src='/menu.png'
            alt='Menu image'
            width={500}
            height={1000}
          />
        )}
      </div>

    </section>
  );
};

export default Menu;
