import Image from "next/image";
import FileIcon from "../SVGs/File-icon";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const Menu = () => {
  const modalContactRef = useRef(null);
  const modalContentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Initialize modal on first render
  useEffect(() => {
    if (modalContactRef.current && isFirstRender) {
      // Set initial state with GSAP instead of direct style manipulation
      gsap.set(modalContactRef.current, {
        opacity: 0,
        pointerEvents: "none",
        display: "flex" // Always have it in the DOM but invisible
      });
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  // Handle modal open/close animations
  useEffect(() => {
    if (!modalContactRef.current || isFirstRender) return;

    if (isModalOpen) {
      // Show backdrop first
      gsap.to(modalContactRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        pointerEvents: "auto"
      });

      // Then animate in the content
      if (modalContentRef.current) {
        gsap.fromTo(modalContentRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, delay: 0.1, ease: "back.out" }
        );
      }
    } else {
      // Animate out the content first
      if (modalContentRef.current) {
        gsap.to(modalContentRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.7,
          ease: "power2.in"
        });
      }

      // Then hide the backdrop
      gsap.to(modalContactRef.current, {
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        pointerEvents: "none",
        ease: "power2.in"
      });
    }
  }, [isModalOpen, isFirstRender]);

  return (
    <section id="Menu" className="flex flex-col justify-center items-center pb-16 md:pt-16">

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
        className="flex gap-2 mt-4 cursor-pointer"
        onClick={() => openModal()}
      >
        <FileIcon/>
        <h6>PDF MENU</h6>
      </button>

      {/* Modal - Keep it always in DOM but control visibility with GSAP */}
      <div
        ref={modalContactRef}
        className="fixed top-0 left-0 w-full h-full bg-secondary/80 z-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target === modalContactRef.current) {
            closeModal();
          }
        }}
      >
        <div ref={modalContentRef} className="bg-background-600 rounded-[20px] p-4 overflow-hidden">
          <Image
            onClick={(e) => e.stopPropagation()}
            src='/menu.png'
            alt='Menu image'
            width={500}
            height={1000}
          />
        </div>
      </div>

    </section>
  );
};

export default Menu;
