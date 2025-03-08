'use client';
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const Gallery = () => {
  const [modalImage, setModalImage] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  // Track animation instances for cleanup
  const animationsRef = useRef({
    backdrop: null,
    content: null
  });

  // Use useCallback to create stable function references
  const openModal = useCallback((src) => {
    setImageLoaded(false); // Reset loading state
    setModalImage(src);
  }, []);

  const closeModal = useCallback(() => {
    // Kill any existing animations first
    if (animationsRef.current.content) {
      animationsRef.current.content.kill();
    }
    if (animationsRef.current.backdrop) {
      animationsRef.current.backdrop.kill();
    }

    // Animate out content first
    animationsRef.current.content = gsap.to(modalContentRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.7,
      ease: "power2.in"
    });

    // Then hide backdrop
    animationsRef.current.backdrop = gsap.to(modalRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.8,
      delay: 0.2,
      ease: "power2.in",
      onComplete: () => setModalImage(null) // Only reset the image source after animation
    });
  }, []);

  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);

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

    // Cleanup function for component unmount
    return () => {
      // Kill any animations that might be running
      gsap.killTweensOf(modalRef.current);
      gsap.killTweensOf(modalContentRef.current);
    };
  }, [isFirstRender]);

  // Handle modal open animations
  useEffect(() => {
    if (!modalRef.current || isFirstRender) return;

    if (modalImage) {
      // Kill any existing animations before creating new ones
      if (animationsRef.current.backdrop) {
        animationsRef.current.backdrop.kill();
      }
      if (animationsRef.current.content) {
        animationsRef.current.content.kill();
      }

      // Show backdrop first
      animationsRef.current.backdrop = gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        pointerEvents: "auto"
      });

      // Then animate in the content
      if (modalContentRef.current) {
        animationsRef.current.content = gsap.fromTo(modalContentRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, delay: 0.1, ease: "back.out" }
        );
      }
    }

    // Cleanup function for effect
    return () => {
      // Kill animations when effect re-runs or component unmounts
      if (animationsRef.current.backdrop) {
        animationsRef.current.backdrop.kill();
      }
      if (animationsRef.current.content) {
        animationsRef.current.content.kill();
      }
    };
  }, [modalImage, isFirstRender]);

  // Handle modal backdrop click with proper cleanup
  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    const handleBackdropClick = (e) => {
      if (e.target === modalElement) {
        closeModal();
      }
    };

    modalElement.addEventListener('click', handleBackdropClick);

    // Clean up event listener when component unmounts
    return () => {
      modalElement.removeEventListener('click', handleBackdropClick);
    };
  }, [closeModal]);

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
            width={450}
            height={450}
            priority={index < 2} // Only prioritize first two images
            className="rounded-[20px] shadower cursor-pointer"
            onClick={() => openModal(src)}
          />
        ))}
      </div>

      {/* Modal - Always in DOM, visibility controlled by GSAP */}
      <div
        ref={modalRef}
        className="fixed top-0 left-0 w-full h-full bg-secondary/80 z-50 flex items-center justify-center"
      >
        <div
          ref={modalContentRef}
          className="bg-background rounded-[20px] p-4 max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[30%] max-h-[80%] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {modalImage && (
            <>
              {/* Loading indicator */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={modalImage}
                alt="Modal Image"
                width={900}
                height={900}
                className="rounded-[20px] object-contain aspect-square"
                onLoadingComplete={handleImageLoaded}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
