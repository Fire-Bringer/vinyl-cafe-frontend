'use client';
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const Gallery = () => {
  const [modalImage, setModalImage] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const modalRef = useRef(null); // Ref for the modal div
  const modalContentRef = useRef(null); // Ref for the content container inside modal

  const openModal = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    // Animate out content first
    gsap.to(modalContentRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.7,
      ease: "power2.in"
    });

    // Then hide backdrop
    gsap.to(modalRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.8,
      delay: 0.2,
      ease: "power2.in",
      onComplete: () => setModalImage(null) // Only reset the image source after animation
    });
  };

  // Initialize modal on first render
  useEffect(() => {
    if (modalRef.current && isFirstRender) {
      // Set initial state with GSAP
      gsap.set(modalRef.current, {
        opacity: 0,
        pointerEvents: "none",
        display: "flex" // Always have it in the DOM but invisible
      });
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  // Handle modal open/close animations
  useEffect(() => {
    if (!modalRef.current || isFirstRender) return;

    if (modalImage) {
      // Show backdrop first
      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        pointerEvents: "auto"
      });

      // Then animate in the content
      if (modalContentRef.current) {
        gsap.fromTo(modalContentRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, delay: 0.1, ease: "back.out" }
        );
      }
    }
  }, [modalImage, isFirstRender]);

  return (
    <section id="Gallery" className="bg-background-600 flex flex-col place-items-center py-16">
      <h2 className="font-display text-4xl mt-4 md:mt-8">Gallery</h2>

      <div className="grid grid-cols-2 grid-rows-3 w-[90%] xl:w-1/2 mt-4 md:mt-8 gap-4 xl:gap-12">
        {[
          "/gallery/best3.webp",
          "/gallery/gallery1.webp",
          "/gallery/gallery2.webp",
          "/gallery/gallery3.webp",
          "/gallery/gallery4.webp",
          "/gallery/gallery5.webp",
        ].map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Gallery image ${index + 1}`}
            width={900}
            height={900}
            className="rounded-[20px] shadower cursor-pointer"
            onClick={() => openModal(src)}
          />
        ))}
      </div>

      {/* Modal - Always in DOM, visibility controlled by GSAP */}
      <div
        ref={modalRef}
        className="fixed top-0 left-0 w-full h-full bg-secondary/80 z-50 flex items-center justify-center"
        onClick={closeModal}
      >
        <div
          ref={modalContentRef}
          className="bg-background rounded-[20px] p-4 max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[30%] max-h-[80%] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {modalImage && (
            <Image
              src={modalImage}
              alt="Modal Image"
              width={900}
              height={900}
              className="rounded-[20px] object-contain aspect-square"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
