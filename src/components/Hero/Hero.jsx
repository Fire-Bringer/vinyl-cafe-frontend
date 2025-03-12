"use client"
import NextImage from "next/image"
import "@/styles/hero.css"
import "@/styles/hero-loading.css"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { RiArrowLeftLongLine, RiArrowRightLongLine } from "@remixicon/react"

const albumImages = [
  { src: "/intro/anri-p.webp", alt: "Anri album cover" },
  { src: "/intro/camp-lo-p.webp", alt: "Camp Lo album cover" },
  { src: "/intro/dilla-p.webp", alt: "J Dilla album cover" },
  { src: "/intro/doom-p.webp", alt: "MF Doom album cover" },
  { src: "/intro/pete-p.webp", alt: "Pete Rock album cover" },
  { src: "/intro/sade-p.webp", alt: "Sade album cover" },
  { src: "/intro/souls-p.webp", alt: "Souls of Mischief album cover" },
  { src: "/intro/taeko-p.webp", alt: "Taeko Onuki album cover" },
  { src: "/intro/brother-p.webp", alt: "Little Brother album cover" },
  { src: "/intro/dan-p.webp", alt: "Steely Dan album cover" },
  { src: "/intro/glasper-p.webp", alt: "Robert Glasper album cover" },
  { src: "/intro/jeru-p.webp", alt: "Jeru tha Damaja album cover" },
  { src: "/intro/tribe-p.webp", alt: "Tribe Called Quest album cover" },
  { src: "/intro/ryo-p.webp", alt: "Ryo Fukui album cover" },
  { src: "/intro/pete-p.webp", alt: "Pete Rock album cover" },
];

const previewImages = [
  { src: "/hero/vinyl_cafe1.webp", alt: "First hero image cover" },
  { src: "/hero/vinyl_cafe2.webp", alt: "Second hero image cover" },
  { src: "/hero/vinyl_cafe3.webp", alt: "Third hero image cover" },
  { src: "/hero/vinyl_cafe4.webp", alt: "Fourth hero image cover" },
  { src: "/hero/vinyl_cafe5.webp", alt: "Fifth hero image cover" },
];

const columnConfig = [
  // Image indices for each column
  [0, 5, 10, 1, 6],     // column 1
  [11, 2, 7, 12, 3],    // column 2
  [8, 13, null, 4, 9],  // column 3 (null for main image slot)
  [14, 0, 5, 10, 1],    // column 4
  [6, 11, 2, 7, 12],    // column 5
];

const Hero = ({ onComplete }) => {
  // DOM Element Reference Definitions
  const containerRef = useRef(null)
  const colRefs = useRef([])
  const item1Refs = useRef([])
  const item2Refs = useRef([])
  const item3Refs = useRef([])
  const item4Refs = useRef([])
  const item5Refs = useRef([])

  const titleRef = useRef(null)
  const previewImgsRefs = useRef([])
  const slideNumRef = useRef(null)
  const prevIconRef = useRef(null)
  const nextIconRef = useRef(null)

  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [prevImageIndex, setPrevImageIndex] = useState(4)
  const currentImageRef = useRef(null)
  const nextImageRef = useRef(null)
  const prevImageRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  // Add state to control auto-slide behavior
  const [autoSlideActive, setAutoSlideActive] = useState(true)
  const autoSlideIntervalRef = useRef(null)
  // Add a state to track if opening animation is complete
  const [openingAnimationComplete, setOpeningAnimationComplete] = useState(false)
  // Add state to detect hydration completion
  const [isHydrated, setIsHydrated] = useState(false)

  // Array Definitions for Grouped Dom Elements
  const addColRef = (el) => {
    if (el && !colRefs.current.includes(el)) {
      colRefs.current.push(el)
    }
  }
  const addItem1Refs = (el) => {
    if (el && !item1Refs.current.includes(el)) {
      item1Refs.current.push(el)
    }
  }
  const addItem2Refs = (el) => {
    if (el && !item2Refs.current.includes(el)) {
      item2Refs.current.push(el)
    }
  }
  const addItem3Refs = (el) => {
    if (el && !item3Refs.current.includes(el)) {
      item3Refs.current.push(el)
    }
  }
  const addItem4Refs = (el) => {
    if (el && !item4Refs.current.includes(el)) {
      item4Refs.current.push(el)
    }
  }
  const addItem5Refs = (el) => {
    if (el && !item5Refs.current.includes(el)) {
      item5Refs.current.push(el)
    }
  }
  const addPreviewImgRef = (el) => {
    if (el && !previewImgsRefs.current.includes(el)) {
      previewImgsRefs.current.push(el)
    }
  }

  // Preload all images before rendering
  useEffect(() => {
    // Create array of all image sources
    const allImageSources = [
      ...albumImages.map((img) => img.src),
      ...previewImages.map((img) => img.src),
    ];

    // Count of loaded images
    let loadedCount = 0;
    const totalImages = allImageSources.length;

    // Update loading state function
    const updateLoadingProgress = () => {
      loadedCount++;
      console.log(`Loaded ${loadedCount}/${totalImages} images`);
    };

    // Actually preload images by creating Image objects
    const imagePromises = allImageSources.map(src => {
      return new Promise((resolve) => {
        // For smaller album images, use regular Image loader
        const img = new Image();
        img.onload = () => {
          updateLoadingProgress();
          resolve();
        };
        img.onerror = (err) => {
          console.error(`Failed to load image: ${src}`, err);
          updateLoadingProgress(); // Still count as "loaded" to prevent UI hanging
          resolve(); // Resolve anyway to not block everything else
        };
        // Add crossOrigin if images are hosted on different domain
        // img.crossOrigin = "anonymous";
        img.src = src; // This triggers the loading
      });
    });

    // Wait for all images to load before setting imagesLoaded to true
    Promise.all(imagePromises)
      .then(() => {
        console.log('All images loaded successfully');
        const isMobile = window.innerWidth <= 768;
        // Increase delay for production only
        const delay = isMobile ? 4000 : 3000;

        setTimeout(() => {
          // Only set images loaded if component is hydrated
          if (isHydrated) {
            setImagesLoaded(true);
          } else {
            // If not hydrated yet, wait a bit more
            const hydrationCheckInterval = setInterval(() => {
              if (isHydrated) {
                setImagesLoaded(true);
                clearInterval(hydrationCheckInterval);
              }
            }, 500);
          }
        }, delay);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        setImagesLoaded(true);
      });
  }, [isHydrated]); // Add isHydrated as dependency

  // Add this effect to detect hydration completion
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Add this function to preload the next/prev images
  const preloadAdjacentImages = () => {
    const nextIdx = (currentImageIndex + 1) % previewImages.length;
    const prevIdx = (currentImageIndex - 1 + previewImages.length) % previewImages.length;

    // Preload next and previous images
    const nextImage = new Image();
    nextImage.src = previewImages[nextIdx].src;

    const prevImage = new Image();
    prevImage.src = previewImages[prevIdx].src;
  }

  // Call this after images load or when current image changes
  useEffect(() => {
    if (imagesLoaded) {
      preloadAdjacentImages();
    }
  }, [imagesLoaded, currentImageIndex]);

  // Opening Animation Definition - Only runs after all images are loaded
  useEffect(() => {
    if (!imagesLoaded) return

    // Force layout calculation to ensure images are rendered
    if (containerRef.current) {
      containerRef.current.getBoundingClientRect()
    }

    // Check if mobile device
    const isMobile = window.innerWidth <= 768;

    // Adjust timing based on device
    const columnDuration = isMobile ? 3 : 3;
    const zoomDuration = isMobile ? 4 : 4;
    const initialDelay = isMobile ? 1 : 1;

    const tl = gsap.timeline({
      delay: initialDelay,
      onComplete: () => {
        // Set opening animation as complete
        setOpeningAnimationComplete(true);
        // Call onComplete when the entire animation timeline finishes
        if (typeof onComplete === 'function') {
          onComplete();
        }
      }
    })

    // Moves all columns to the top from the bottom
    tl.to(colRefs.current, {
      top: "0",
      duration: columnDuration,
      ease: "power4.inOut",
    })

    // Moves all images within the first column to the top
    tl.to(
      item1Refs.current,
      {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut",
      },
      "-=2",
    )

    // Moves all images within the second column
    tl.to(
      item2Refs.current,
      {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut",
      },
      "-=4",
    )

    // Third column
    tl.to(
      item3Refs.current,
      {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut",
      },
      "-=4",
    )

    // Fourth column
    tl.to(
      item4Refs.current,
      {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut",
      },
      "-=4",
    )

    // Fifth column
    tl.to(
      item5Refs.current,
      {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut",
      },
      "-=4",
    )

    // Zoom animation to reveal main hero image
    tl.to(
      containerRef.current,
      {
        scale: 6, // Less extreme scale for mobile
        duration: zoomDuration,
        ease: "power4.inOut",
      },
      "-=2",
    )

    tl.to(
      slideNumRef.current,
      {
        top: 0,
        stagger: 0.075,
        duration: 1,
        ease: "power3.out",
      },
      "-=1.5",
    )

    tl.to(
      previewImgsRefs.current,
      {
        top: 0,
        stagger: 0.075,
        duration: 1,
        ease: "power3.out",
      },
      "-=1.5",
    )

    tl.to(
      ".icon svg, .icon-2 svg",
      {
        scale: 1,
        stagger: 0.05,
        ease: "power3.out",
      },
      "-=1",
    )

    // Animation to make the hero text appear
    tl.to(
      titleRef.current,
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=1.5",
    )
  }, [imagesLoaded, onComplete])

  // Add auto-slide functionality
  useEffect(() => {
    // Only start auto-sliding when opening animation is complete
    if (!imagesLoaded || !openingAnimationComplete || !autoSlideActive) return;

    console.log("Starting auto-slide after opening animation completed");

    // Clear any existing interval first
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }

    // Set up auto-slide interval (5 seconds)
    autoSlideIntervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        if (nextIconRef.current) {
          nextIconRef.current.click();
        }
      }
    }, 2000);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [imagesLoaded, currentImageIndex, isTransitioning, previewImages.length, autoSlideActive, openingAnimationComplete]);

  // Slider animation
  useEffect(() => {
    if (!imagesLoaded) return

    const currentImg = currentImageRef.current
    const nextImg = nextImageRef.current
    const prevImg = prevImageRef.current
    const prevIcon = prevIconRef.current
    const nextIcon = nextIconRef.current
    const slideNum = slideNumRef.current

    if (!currentImg || !nextImg || !prevImg || !previewImages || !prevIcon || !nextIcon || !slideNum) {
      return
    }

    gsap.set(prevImg, {
      opacity: 0,
      scale: 0.95,
      x: -10,
      visibility: "invisible",
    })
    gsap.set(currentImg, {
      opacity: 1,
      scale: 1,
      x: 0,
      visibility: "visible",
    })
    gsap.set(nextImg, {
      opacity: 0,
      scale: 0.95,
      x: 10,
      visibility: "invisible",
    })

    function updateImage(newIndex, direction = "next") {
      if (isTransitioning) return
      setIsTransitioning(true)

      // Get DOM references
      const currentImg = currentImageRef.current
      const nextImg = nextImageRef.current
      const prevImg = prevImageRef.current
      const slideNum = slideNumRef.current

      if (!currentImg || !nextImg || !prevImg || !slideNum) return

      // Calculate the correct indices
      const prevImageIdx = (newIndex - 1 + previewImages.length) % previewImages.length
      const nextImageIdx = (newIndex + 1) % previewImages.length

      // Set up initial positions based on direction
      if (direction === "next") {
        // For next transition, position the new image to enter from right
        gsap.set(nextImg, {
          opacity: 0,
          scale: 0.95,
          x: 30,
          src: previewImages[newIndex].src
        })
      } else {
        // For prev transition, position the new image to enter from left
        gsap.set(prevImg, {
          opacity: 0,
          scale: 0.95,
          x: -30,
          src: previewImages[newIndex].src
        })
      }

      // Create animation timeline with improved sequencing
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          // Update state after animation completes
          setPrevImageIndex(prevImageIdx)
          setCurrentImageIndex(newIndex)
          setNextImageIndex(nextImageIdx)
          setIsTransitioning(false)
        }
      })

      if (direction === "next") {
        // First start fading out current image
        tl.to(currentImg, {
          opacity: 0,
          scale: 0.95,
          x: -30,
          duration: 0.8
        })
        // Then start fading in next image with slight delay
        .to(nextImg, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.8
        }, "0")
      } else {
        // First start fading out current image
        tl.to(currentImg, {
          opacity: 0,
          scale: 0.95,
          x: 30,
          duration: 0.8
        })
        // Then start fading in prev image with slight delay
        .to(prevImg, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.8
        }, "0")
      }

      // Update slide number with the same technique
      tl.to(slideNum, {
        opacity: 0,
        y: -5,
        duration: 0.3,
        onComplete: () => {
          slideNum.innerHTML = `${newIndex + 1} &mdash; ${previewImages.length}`
        }
      }, "-=0.4")
      .to(slideNum, {
        opacity: 1,
        y: 0,
        duration: 0.3
      })
    }

    // Define click handlers that we can remove later
    const handlePrevClick = () => {
      // Temporarily disable auto-slide when user manually navigates
      setAutoSlideActive(false);
      const newIndex = (currentImageIndex - 1 + previewImages.length) % previewImages.length
      updateImage(newIndex, "prev")

      // Resume auto-slide after a delay
      setTimeout(() => setAutoSlideActive(true), 10000);
    }

    const handleNextClick = () => {
      // Temporarily disable auto-slide when user manually navigates
      setAutoSlideActive(false);
      const newIndex = (currentImageIndex + 1) % previewImages.length
      updateImage(newIndex, "next")

      // Resume auto-slide after a delay
      setTimeout(() => setAutoSlideActive(true), 10000);
    }

    // Add event listeners with proper references
    prevIcon.addEventListener("click", handlePrevClick)
    nextIcon.addEventListener("click", handleNextClick)

    // Cleanup event listeners
    return () => {
      prevIcon?.removeEventListener("click", handlePrevClick)
      nextIcon?.removeEventListener("click", handleNextClick)
    }
  }, [imagesLoaded, previewImages.length, prevImageIndex, currentImageIndex, nextImageIndex, isTransitioning])

  return (
    <section className="hero" id="Home">
      <div className={`loading-overlay ${imagesLoaded ? 'fade-out' : ''}`}>
        <div className="loading-spinner">
          <NextImage
            src="/vinyl.svg"
            alt="Loading spinner"
            width={100}
            height={100}
            className="vinyl-spin"
            priority
          />
        </div>
        <p className="font-body text-primary loading-text">"And munchies for all..."</p>
      </div>

      {imagesLoaded && (
        <>
          <div className="hero-container" ref={containerRef}>
            {columnConfig.map((column, colIndex) => (
              <div
                key={`col-${colIndex}`}
                className={`col c-${colIndex + 1}`}
                ref={addColRef}
              >
                {column.map((imgIndex, itemIndex) => {
                  // For main image placeholder
                  if (imgIndex === null) {
                    return (
                      <div key={`item-${colIndex}-${itemIndex}`} className="item main-image" ref={
                        colIndex === 2 ? addItem3Refs : null // Column 3 uses addItem3Refs
                      }>
                        <div className="main-image-container">
                          <NextImage
                            src={previewImages[currentImageIndex].src}
                            alt={previewImages[currentImageIndex].alt}
                            width={1920}
                            height={1080}
                            quality={100}
                            className="intro-img current-img"
                            ref={currentImageRef}
                            priority
                            loading="eager"
                          />
                          <NextImage
                            src={previewImages[nextImageIndex].src}
                            alt={previewImages[nextImageIndex].alt}
                            width={1920}
                            height={1080}
                            quality={100}
                            className="intro-img next-img"
                            ref={nextImageRef}
                            priority
                          />
                          <NextImage
                            src={previewImages[prevImageIndex].src}
                            alt={previewImages[prevImageIndex].alt}
                            width={1920}
                            height={1080}
                            quality={100}
                            className="intro-img prev-img"
                            ref={prevImageRef}
                            priority
                          />
                        </div>
                      </div>
                    );
                  }

                  // Regular album image
                  const image = albumImages[imgIndex];
                  return (
                    <div
                      key={`item-${colIndex}-${itemIndex}`}
                      className="item"
                      ref={
                        colIndex === 0 ? addItem1Refs :
                        colIndex === 1 ? addItem2Refs :
                        colIndex === 2 ? addItem3Refs :
                        colIndex === 3 ? addItem4Refs :
                        addItem5Refs
                      }
                    >
                      <NextImage
                        src={image.src}
                        alt={image.alt}
                        width={250}
                        height={250}
                        className="intro-img"
                        priority
                        loading="eager"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="shop-title">
            <div className="icon t-shadower cursor-pointer" ref={prevIconRef}>
              <RiArrowLeftLongLine />
            </div>
            <div className="title" ref={titleRef}>
              <h5>COFFEE & BAR</h5>
              <h1>Vinyl Cafe</h1>
              <h6>Good Music, Good Vibes, Good Times</h6>
              <dl>
                <dt>Open Hours</dt>
                <dd>Mon-Fri 12PM-4PM 7PM-12AM</dd>
                <dd>Sat-Sun 1PM-12AM</dd>
                <dd>Thur Closed</dd>
              </dl>
            </div>
            <div className="icon-2 t-shadower cursor-pointer" ref={nextIconRef}>
              <RiArrowRightLongLine />
            </div>
          </div>

          <div className="hero-footer">
            <div className="preview">
              {previewImages.map((img, index) => (
                <NextImage
                  key={index}
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  width={1920}
                  height={1000}
                  className="intro-img hero-img"
                  ref={addPreviewImgRef}
                />
              ))}
            </div>

            <div className="slide-num">
              <p ref={slideNumRef}>1 &mdash; 5</p>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Hero
