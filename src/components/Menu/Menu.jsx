import Image from "next/image";
import FileIcon from "../SVGs/File-icon";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

const Menu = () => {
  const modalContactRef = useRef(null);
  const modalContentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Track animation instances for cleanup
  const animationsRef = useRef({
    backdrop: null,
    content: null
  });

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Initialize modal on first render
  useEffect(() => {
    if (modalContactRef.current && isFirstRender) {
      // Set initial state with GSAP including negative z-index to keep it below everything else during load
      gsap.set(modalContactRef.current, {
        opacity: 0,
        pointerEvents: "none",
        display: "flex", // Always have it in the DOM but invisible
        zIndex: -1 // Start with negative z-index to prevent flash during load
      });
      setIsFirstRender(false);
    }

    // Cleanup function to kill any animations when component unmounts
    return () => {
      // Kill any animations that might be running
      if (modalContactRef.current) {
        gsap.killTweensOf(modalContactRef.current);
      }
      if (modalContentRef.current) {
        gsap.killTweensOf(modalContentRef.current);
      }
    };
  }, [isFirstRender]);

  // Handle modal open/close animations with proper cleanup
  useEffect(() => {
    if (!modalContactRef.current || isFirstRender) return;

    // Clean up any existing animations before creating new ones
    if (animationsRef.current.backdrop) {
      animationsRef.current.backdrop.kill();
    }
    if (animationsRef.current.content) {
      animationsRef.current.content.kill();
    }

    if (isModalOpen) {
      // Set positive z-index before showing modal
      gsap.set(modalContactRef.current, { zIndex: 50 });

      // Show backdrop first
      animationsRef.current.backdrop = gsap.to(modalContactRef.current, {
        opacity: 1,
        duration: 0.5, // Slightly faster for better UX
        ease: "power2.out",
        pointerEvents: "auto"
      });

      // Then animate in the content
      if (modalContentRef.current) {
        animationsRef.current.content = gsap.fromTo(modalContentRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, delay: 0.1, ease: "back.out" }
        );
      }
    } else {
      // Animate out the content first
      if (modalContentRef.current) {
        animationsRef.current.content = gsap.to(modalContentRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.5, // Slightly faster for better UX
          ease: "power2.in"
        });
      }

      // Then hide the backdrop
      animationsRef.current.backdrop = gsap.to(modalContactRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        pointerEvents: "none",
        ease: "power2.in",
        onComplete: () => {
          // Return to negative z-index after animation completes
          gsap.set(modalContactRef.current, { zIndex: -1 });
        }
      });
    }

    // Cleanup function that kills animations when effect re-runs or component unmounts
    return () => {
      if (animationsRef.current.backdrop) {
        animationsRef.current.backdrop.kill();
      }
      if (animationsRef.current.content) {
        animationsRef.current.content.kill();
      }
    };
  }, [isModalOpen, isFirstRender]);

  // Handle click events on modal backdrop - with cleanup
  useEffect(() => {
    const modalEl = modalContactRef.current;
    if (!modalEl) return;

    const handleBackdropClick = (e) => {
      if (e.target === modalEl) {
        closeModal();
      }
    };

    modalEl.addEventListener('click', handleBackdropClick);

    // Clean up event listener when component unmounts
    return () => {
      modalEl.removeEventListener('click', handleBackdropClick);
    };
  }, [closeModal]);

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
      <p className="font-body text-base w-4/5 md:w-3/5 xl:w-1/4 mt-4">
      こだわりのコーヒー、自家製サンドイッチ、美味しい軽食をお楽しみください。淹れたてのコーヒー、風味豊かなお食事、甘いおやつをご用意しております。シンプルな喜びを、完璧な組み合わせでどうぞ。<br /><br />Savor crafted coffees, artisanal sandwiches, and delightful snacks. Enjoy fresh brews, savory bites, and sweet treats. Our menu offers simple pleasures, perfectly paired.
      </p>

      {/* Links */}
      <button
        className="flex gap-2 mt-4 cursor-pointer"
        onClick={openModal}
      >
        <FileIcon/>
        <h6>PDF MENU</h6>
      </button>

      {/* Modal - Always in DOM but visibility controlled by GSAP */}
      <div
        ref={modalContactRef}
        className="fixed top-0 left-0 w-full h-full bg-secondary/80 z-50 flex items-center justify-center"
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
