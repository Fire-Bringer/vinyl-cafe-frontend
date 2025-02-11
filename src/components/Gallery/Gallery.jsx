'use client';
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const Gallery = () => {

  const [modalImage, setModalImage] = useState(null);
  const modalRef = useRef(null); // Ref for the modal div
  const modalImageRef = useRef(null); // Ref for the image inside the modal

  const openModal = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    gsap.to(modalImageRef.current, { scale: 0.8, opacity: 0, duration: 0.3 });
    gsap.to(modalRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      onComplete: () => setModalImage(null),
    });
  };

  useEffect(() => {
    if (modalImage) {
      gsap.to(modalRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
      gsap.from(modalImageRef.current, { scale: 0.8, opacity: 0, duration: 0.3 });
    }
  }, [modalImage]);


  return (
    <section id="Gallery" className="bg-background-600 flex flex-col place-items-center pt-20 pb-40">
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
            className="rounded-[20px] shadower cursor-pointer" // Make images clickable
            onClick={() => openModal(src)} // Open modal on click
          />
        ))}
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          ref={modalRef} // Assign the ref here
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center opacity-0 pointer-events-none" // Initially hidden
          onClick={closeModal} // Close on backdrop click
        >
          <div className="bg-background rounded-[20px] p-4 max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[30%] max-h-[80%] overflow-hidden" onClick={(e) => e.stopPropagation()}> {/* Prevent backdrop close on image click */}
            <Image
              ref={modalImageRef} // Assign the ref here
              src={modalImage}
              alt="Modal Image"
              width={900}
              height={900}
              className="rounded-[20px] object-contain aspect-square"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
