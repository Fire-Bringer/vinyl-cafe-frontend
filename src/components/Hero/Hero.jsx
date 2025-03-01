"use client"
import NextImage from "next/image"
import "@/styles/hero.css"
import "@/styles/hero-loading.css"
import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { RiArrowLeftLongLine, RiArrowRightLongLine } from "@remixicon/react"

const Hero = () => {
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
  const [loadedImagesCount, setLoadedImagesCount] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const currentImageRef = useRef(null)
  const nextImageRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalImages = 26 // Total number of images to load (25 album covers + 1 main image)

  const previewImages = [
    { src: "/hero/vinyl_cafe1.webp", alt: "First hero image cover" },
    { src: "/hero/vinyl_cafe2.webp", alt: "Second hero image cover" },
    { src: "/hero/vinyl_cafe3.webp", alt: "Third hero image cover" },
    { src: "/hero/vinyl_cafe4.webp", alt: "Fourth hero image cover" },
    { src: "/hero/vinyl_cafe5.webp", alt: "Fifth hero image cover" },
  ]


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

  // Image loading handler
  const handleImageLoad = useCallback(() => {
    setLoadedImagesCount((prev) => {
      const newCount = prev + 1
      if (newCount >= totalImages) {
        setImagesLoaded(true)
      }
      return newCount
    })
  }, [totalImages])

  // Animation Definition - Only runs after all images are loaded
  useEffect(() => {
    if (!imagesLoaded) return

    const tl = gsap.timeline({ delay: 0 })

    // Moves all columns to the top from the bottom
    tl.to(colRefs.current, {
      top: "0",
      duration: 3,
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
        scale: 6,
        duration: 4,
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
  }, [imagesLoaded])

  // Slider animation
  useEffect(() => {
    if (!imagesLoaded) return

    const currentImg = currentImageRef.current
    const nextImg = nextImageRef.current
    const prevIcon = prevIconRef.current
    const nextIcon = nextIconRef.current
    const slideNum = slideNumRef.current

    if (!currentImg || !nextImg || !previewImages || !prevIcon || !nextIcon || !slideNum) {
      return
    }

    // Inside your updateImage function:

    function updateImage(newIndex, direction = "next") {
      if (isTransitioning) return
      setIsTransitioning(true)

      // Calculate the correct next index immediately
      const nextImageIdx =
        direction === "prev"
          ? (newIndex - 1 + previewImages.length) % previewImages.length
          :(newIndex + 1) % previewImages.length

      // Update both state values right away to ensure proper rendering
      setCurrentImageIndex(newIndex)
      setNextImageIndex(nextImageIdx)

      // Set initial state for animation - ensure both images are visible with proper opacity
      gsap.set(currentImg, { opacity: 1, scale: 1, display: 'block' })
      gsap.set(nextImg, { opacity: 0, scale: 0.95, display: 'block' })

      // Create a smoother animation timeline
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          // Only reset transition flag when animation completes
          setIsTransitioning(false)
        }
      })

      // Animation sequence remains the same
      tl.to(currentImg, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power1.inOut"
      })
      .to(nextImg, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power1.inOut"
      }, "-=0.8") // Full overlap for smooth crossfade

      // Rest of the animation
      .to(slideNum, {
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
      const newIndex = (currentImageIndex - 1 + previewImages.length) % previewImages.length
      updateImage(newIndex, "prev")
    }

    const handleNextClick = () => {
      const newIndex = (currentImageIndex + 1) % previewImages.length
      updateImage(newIndex, "next")
    }

    // Add event listeners with proper references
    prevIcon.addEventListener("click", handlePrevClick)
    nextIcon.addEventListener("click", handleNextClick)

    // Cleanup event listeners
    return () => {
      prevIcon?.removeEventListener("click", handlePrevClick)
      nextIcon?.removeEventListener("click", handleNextClick)
    }
  }, [imagesLoaded, previewImages.length, currentImageIndex, isTransitioning])

  // Preload all images
  useEffect(() => {
    // Create an array of all image sources
    const allImageSources = [
      "/intro/anri-p.webp",
      "/intro/blu-p.webp",
      "/intro/brother-p.webp",
      "/intro/camp-lo-p.webp",
      "/intro/dan-p.webp",
      "/intro/deltron-p.webp",
      "/intro/dilla-p.webp",
      "/intro/doom-p.webp",
      "/intro/glasper-p.webp",
      "/intro/heron-p.webp",
      "/intro/hiero-p.webp",
      "/intro/jeru-p.webp",
      "/intro/lauryn-p.webp",
      "/intro/madlib-p.webp",
      "/intro/marvin-p.webp",
      "/intro/maze-p.webp",
      "/intro/mos-p.webp",
      "/intro/outkast-p.webp",
      "/intro/pete-p.webp",
      "/intro/quasi-p.webp",
      "/intro/ryo-p.webp",
      "/intro/sade-p.webp",
      "/intro/souls-p.webp",
      "/intro/taeko-p.webp",
      ...previewImages.map((img) => img.src),
    ]

    // Preload all images using the global Image constructor
    allImageSources.forEach((src) => {
      const img = new window.Image()
      img.src = src
      img.onload = handleImageLoad
      img.onerror = handleImageLoad // Count errors as loaded to prevent hanging
    })
  }, [handleImageLoad, previewImages])

  return (
    <section className="hero" id="Home">
      {!imagesLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>
            Loading {loadedImagesCount}/{totalImages} images...
          </p>
        </div>
      )}

      <div className="hero-container" ref={containerRef}>
        <div className="col c-1" ref={addColRef}>
          <div className="item" ref={addItem1Refs}>
            <NextImage
              src="/intro/anri-p.webp"
              alt="Anri album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem1Refs}>
            <NextImage
              src="/intro/blu-p.webp"
              alt="Blu album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem1Refs}>
            <NextImage
              src="/intro/brother-p.webp"
              alt="Little Brother album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem1Refs}>
            <NextImage
              src="/intro/camp-lo-p.webp"
              alt="Camp Lo album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem1Refs}>
            <NextImage
              src="/intro/dan-p.webp"
              alt="Steely Dan album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className="col c-2" ref={addColRef}>
          <div className="item" ref={addItem2Refs}>
            <NextImage
              src="/intro/deltron-p.webp"
              alt="Deltron album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem2Refs}>
            <NextImage
              src="/intro/dilla-p.webp"
              alt="J Dilla album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem2Refs}>
            <NextImage
              src="/intro/doom-p.webp"
              alt="MF Doom album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem2Refs}>
            <NextImage
              src="/intro/glasper-p.webp"
              alt="Robert Glasper album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem2Refs}>
            <NextImage
              src="/intro/heron-p.webp"
              alt="Gill Scott Heron album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className="col c-3" ref={addColRef}>
          <div className="item" ref={addItem3Refs}>
            <NextImage
              src="/intro/hiero-p.webp"
              alt="Hieroglyphics album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem3Refs}>
            <NextImage
              src="/intro/jeru-p.webp"
              alt="Jeru tha Damaja album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item main-image" ref={addItem3Refs}>
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
                onLoad={handleImageLoad}
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
                onLoad={handleImageLoad}
              />
            </div>
          </div>
          <div className="item" ref={addItem3Refs}>
            <NextImage
              src="/intro/lauryn-p.webp"
              alt="Lauryn Hill album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem3Refs}>
            <NextImage
              src="/intro/madlib-p.webp"
              alt="Madlib album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className="col c-4" ref={addColRef}>
          <div className="item" ref={addItem4Refs}>
            <NextImage
              src="/intro/marvin-p.webp"
              alt="Marvin Gaye album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem4Refs}>
            <NextImage
              src="/intro/maze-p.webp"
              alt="Maze album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem4Refs}>
            <NextImage
              src="/intro/mos-p.webp"
              alt="Mos Def album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem4Refs}>
            <NextImage
              src="/intro/outkast-p.webp"
              alt="Outkast album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem4Refs}>
            <NextImage
              src="/intro/pete-p.webp"
              alt="Pete Rock album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className="col c-5" ref={addColRef}>
          <div className="item" ref={addItem5Refs}>
            <NextImage
              src="/intro/quasi-p.webp"
              alt="Quasimoto album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem5Refs}>
            <NextImage
              src="/intro/ryo-p.webp"
              alt="Ryo Fukui album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem5Refs}>
            <NextImage
              src="/intro/sade-p.webp"
              alt="Sade album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem5Refs}>
            <NextImage
              src="/intro/souls-p.webp"
              alt="Souls of Mischief album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="item" ref={addItem5Refs}>
            <NextImage
              src="/intro/taeko-p.webp"
              alt="Taeko Onuki album cover"
              width={300}
              height={300}
              className="intro-img"
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>

      <div className="shop-title">
        <div className="icon t-shadower" ref={prevIconRef}>
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
        <div className="icon-2 t-shadower" ref={nextIconRef}>
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
              onLoad={handleImageLoad}
            />
          ))}
        </div>

        <div className="slide-num">
          <p ref={slideNumRef}>1 &mdash; 5</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
