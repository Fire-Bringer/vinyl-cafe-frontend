"use client"
import Image from "next/image"
import { useState, useRef, useEffect, useCallback } from "react"
import gsap from "gsap"

const Gallery = () => {
  const [modalImage, setModalImage] = useState(null)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [shouldRenderModal, setShouldRenderModal] = useState(false)
  const modalRef = useRef(null)
  const modalContentRef = useRef(null)
  const imageCache = useRef(new Set())

  // Track animation instances for cleanup
  const animationsRef = useRef({
    backdrop: null,
    content: null,
  })

  // Delay modal initialization to avoid conflicts with hero
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRenderModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Preload images for smoother modal experience
  useEffect(() => {
    const imagePaths = [
      "/gallery/best3.webp",
      "/gallery/gallery1.webp",
      "/gallery/gallery2.webp",
      "/gallery/gallery3.webp",
      "/gallery/gallery4.webp",
      "/gallery/gallery5.webp",
    ]

    // Preload all images that aren't already cached
    imagePaths.forEach((path) => {
      if (!imageCache.current.has(path)) {
        const img = new globalThis.Image()
        img.src = path
        img.onload = () => {
          imageCache.current.add(path)
        }
      }
    })
  }, [])

  // Use useCallback to create stable function references
  const openModal = useCallback((src) => {
    setImageLoaded(false) // Reset loading state
    setModalImage(src)
  }, [])

  const closeModal = useCallback(() => {
    // Kill any existing animations first
    if (animationsRef.current.content) {
      animationsRef.current.content.kill()
    }
    if (animationsRef.current.backdrop) {
      animationsRef.current.backdrop.kill()
    }

    // Animate out content first
    animationsRef.current.content = gsap.to(modalContentRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.7,
      ease: "power2.in",
    })

    // Then hide backdrop
    animationsRef.current.backdrop = gsap.to(modalRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.8,
      delay: 0.2,
      ease: "power2.in",
      onComplete: () => {
        // Set z-index back to -1 when hidden
        gsap.set(modalRef.current, { zIndex: -1 });
        setModalImage(null); // Only reset the image source after animation
      }
    })
  }, [])

  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true)

    // Only animate content after image is loaded
    if (modalContentRef.current) {
      // Kill any existing content animation
      if (animationsRef.current.content) {
        animationsRef.current.content.kill()
      }

      // Animate in the content now that image is loaded
      animationsRef.current.content = gsap.fromTo(
        modalContentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out" },
      )
    }
  }, [])

  // Initialize modal on first render
  useEffect(() => {
    if (modalRef.current && shouldRenderModal) {
      // Set initial state with GSAP - starting with negative z-index
      gsap.set(modalRef.current, {
        opacity: 0,
        pointerEvents: "none",
        display: "flex",
        zIndex: -1, // Start with negative z-index to prevent flash
        visibility: "hidden" // Add visibility property for extra safety
      })
      setIsFirstRender(false)
    }

    // Cleanup function for component unmount
    return () => {
      // Kill any animations that might be running
      gsap.killTweensOf(modalRef.current)
      gsap.killTweensOf(modalContentRef.current)
    }
  }, [shouldRenderModal])

  // Handle modal open animations - only animate backdrop initially
  useEffect(() => {
    if (!modalRef.current || isFirstRender) return

    if (modalImage) {
      // Set proper z-index before showing modal
      gsap.set(modalRef.current, {
        zIndex: 50,
        visibility: "visible"
      });

      // Kill any existing backdrop animation
      if (animationsRef.current.backdrop) {
        animationsRef.current.backdrop.kill()
      }

      // Show backdrop first
      animationsRef.current.backdrop = gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        pointerEvents: "auto",
      })

      // Set initial state for content - will be animated after image loads
      if (modalContentRef.current) {
        gsap.set(modalContentRef.current, {
          scale: 0.8,
          opacity: 0,
        })
      }
    }

    // Cleanup function for effect
    return () => {
      // Kill animations when effect re-runs or component unmounts
      if (animationsRef.current.backdrop) {
        animationsRef.current.backdrop.kill()
      }
    }
  }, [modalImage, isFirstRender])

  // Handle modal backdrop click with proper cleanup
  useEffect(() => {
    const modalElement = modalRef.current
    if (!modalElement) return

    const handleBackdropClick = (e) => {
      if (e.target === modalElement) {
        closeModal()
      }
    }

    modalElement.addEventListener("click", handleBackdropClick)

    // Clean up event listener when component unmounts
    return () => {
      modalElement.removeEventListener("click", handleBackdropClick)
    }
  }, [closeModal])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && modalImage) {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => {
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [modalImage, closeModal])

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
            src={src || "/placeholder.svg"}
            alt={`Gallery image ${index + 1}`}
            width={450}
            height={450}
            priority={index < 2} // Only prioritize first two images
            className="rounded-[20px] shadower cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            onClick={() => openModal(src)}
          />
        ))}
      </div>

      {/* Modal - Only rendered when ready, additional CSS safety classes */}
      {shouldRenderModal && (
        <div
          ref={modalRef}
          className="fixed top-0 left-0 w-full h-full bg-secondary/80 flex items-center justify-center opacity-0 invisible"
          // Initial inline style prevents flash before GSAP initialization
          style={{ zIndex: -1 }}
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
                <div className={`transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}>
                  <Image
                    src={modalImage || "/placeholder.svg"}
                    alt="Modal Image"
                    width={900}
                    height={900}
                    className="rounded-[20px] object-contain aspect-square"
                    onLoadingComplete={handleImageLoaded}
                    priority={true}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
