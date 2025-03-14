'use client';
import Contact from '@/components/Contact/Contact';
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

const Access = () => {
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [shouldRenderModal, setShouldRenderModal] = useState(false);

  // Track animation instances for cleanup
  const animationsRef = useRef({
    backdrop: null,
    content: null
  });

  // Delay modal rendering to avoid conflicts with hero
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRenderModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    // Kill any existing animations
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
      duration: 0.3,
      ease: "power2.in"
    });

    // Then hide backdrop
    animationsRef.current.backdrop = gsap.to(modalRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.4,
      delay: 0.2,
      ease: "power2.in",
      onComplete: () => {
        // Set negative z-index when closed
        gsap.set(modalRef.current, {
          zIndex: -1,
          visibility: "hidden"
        });
        setIsModalOpen(false); // Only completely close after animation
      }
    });
  }, []);

  // Initialize modal once it's rendered
  useEffect(() => {
    if (modalRef.current && shouldRenderModal) {
      // Set initial state with GSAP including negative z-index
      gsap.set(modalRef.current, {
        opacity: 0,
        pointerEvents: "none",
        display: "flex",
        zIndex: -1, // Start with negative z-index
        visibility: "hidden" // Add visibility property for extra safety
      });
      setIsFirstRender(false);
    }

    // Cleanup function for component unmount
    return () => {
      if (modalRef.current) {
        gsap.killTweensOf(modalRef.current);
      }
      if (modalContentRef.current) {
        gsap.killTweensOf(modalContentRef.current);
      }
    };
  }, [shouldRenderModal]);

  // Handle modal open animations
  useEffect(() => {
    if (!modalRef.current || isFirstRender || !shouldRenderModal) return;

    if (isModalOpen) {
      // Kill any existing animations
      if (animationsRef.current.backdrop) {
        animationsRef.current.backdrop.kill();
      }
      if (animationsRef.current.content) {
        animationsRef.current.content.kill();
      }

      // Set positive z-index before showing modal
      gsap.set(modalRef.current, {
        zIndex: 50,
        visibility: "visible",
        pointerEvents: "auto" // Enable pointer events when showing
      });

      // Show backdrop first
      animationsRef.current.backdrop = gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Then animate in the content
      if (modalContentRef.current) {
        animationsRef.current.content = gsap.fromTo(
          modalContentRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, delay: 0.1, ease: "back.out" }
        );
      }
    }

    // Cleanup function
    return () => {
      if (animationsRef.current.backdrop) {
        animationsRef.current.backdrop.kill();
      }
      if (animationsRef.current.content) {
        animationsRef.current.content.kill();
      }
    };
  }, [isModalOpen, isFirstRender, shouldRenderModal]);

  // Handle backdrop click for closing modal
  useEffect(() => {
    if (!modalRef.current || !shouldRenderModal) return;

    const handleBackdropClick = (e) => {
      if (e.target === modalRef.current && isModalOpen) {
        closeModal();
      }
    };

    const modalElement = modalRef.current;
    modalElement.addEventListener('click', handleBackdropClick);

    return () => {
      modalElement.removeEventListener('click', handleBackdropClick);
    };
  }, [closeModal, isModalOpen, shouldRenderModal]);

  return (
    <section id="Access" className="flex flex-col justify-center items-center pt-16">
      <h2 className="font-display text-4xl">Access</h2>

      {/* Map and contact info */}
      <a href="https://www.google.com/maps/place/Kanazawa+Station/@36.5780443,136.6481714,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8334203bb8605:0x5d5df6011ebba7ea!8m2!3d36.5780443!4d136.6481714!16zL20vMGZ3bnZr?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D" target="_blank" className="mt-4 w-4/5 xl:w-1/2 shadower rounded-[20px]">
        <img src="/map.png" alt="Map image" className="rounded-[20px]"/>
      </a>

      <h5 className="mt-6">7-77-77 Dopeland Kanazawa</h5>

      <h5>TEL: 777-777-777</h5>

      <button
        className="border-2 border-secondary py-4 px-10 rounded-[20px] bg-secondary text-primary font-body text-lg shadower mt-6 mb-20"
        onClick={openModal}
      >
        Contact
      </button>

      {/* Modal - Only rendered after delay, with CSS-based initial hiding */}
      {shouldRenderModal && (
        <div
          ref={modalRef}
          className="fixed top-0 left-0 w-full h-full bg-secondary/80 flex items-center justify-center opacity-0"
          style={{ zIndex: -1 }}
        >
          <div
            ref={modalContentRef}
            className="bg-background-600 rounded-[20px] overflow-hidden w-4/5 lg:w-2/5"
            onClick={(e) => e.stopPropagation()}
          >
            <Contact onClose={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Access;
