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
  const [prevImageIndex, setPrevImageIndex] = useState(4)
  const currentImageRef = useRef(null)
  const nextImageRef = useRef(null)
  const prevImageRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const totalImages = 15 // Total number of images to load (25 album covers + 1 main image)

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

  // Preload all images before rendering
  useEffect(() => {
    // Create an array of all image sources
    const allImageSources = [
      "/intro/anri-p.webp",
      "/intro/brother-p.webp",
      "/intro/camp-lo-p.webp",
      "/intro/dilla-p.webp",
      "/intro/doom-p.webp",
      "/intro/heron-p.webp",
      "/intro/madlib-p.webp",
      "/intro/marvin-p.webp",
      "/intro/mos-p.webp",
      "/intro/pete-p.webp",
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
    const prevImg = prevImageRef.current
    const prevIcon = prevIconRef.current
    const nextIcon = nextIconRef.current
    const slideNum = slideNumRef.current

    if (!currentImg || !nextImg || !prevImg || !previewImages || !prevIcon || !nextIcon || !slideNum) {
      return
    }

    gsap.set(prevImg, { opacity: 0, scale: 0.95, x: -10, display: 'block' })
    gsap.set(currentImg, { opacity: 1, scale: 1, x: 0, display: 'block' })
    gsap.set(nextImg, { opacity: 0, scale: 0.95, x: 10, display: 'block' })

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
          display: 'block',
          src: previewImages[newIndex].src
        })
      } else {
        // For prev transition, position the new image to enter from left
        gsap.set(prevImg, {
          opacity: 0,
          scale: 0.95,
          x: -30,
          display: 'block',
          src: previewImages[newIndex].src
        })
      }

      // Create animation timeline
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

      // Animate current image out
      if (direction === "next") {
        tl.to(currentImg, {
          opacity: 0,
          scale: 0.95,
          x: -30, // Move current image to the left as it exits
          duration: 1
        })
        .to(nextImg, {
          opacity: 1,
          scale: 1,
          x: 0, // Move next image to center
          duration: 1
        }, "-=1") // Full overlap for smooth crossfade
      } else {
        tl.to(currentImg, {
          opacity: 0,
          scale: 0.95,
          x: 30, // Move current image to the right as it exits
          duration: 1
        })
        .to(prevImg, {
          opacity: 1,
          scale: 1,
          x: 0, // Move prev image to center
          duration: 1
        }, "-=1") // Full overlap for smooth crossfade
      }

      // Update slide number
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
  }, [imagesLoaded, previewImages.length, prevImageIndex, currentImageIndex, nextImageIndex, isTransitioning])

  return (
    <section className="hero" id="Home">
      {!imagesLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="font-body">
            Loading {loadedImagesCount}/{totalImages} images...
          </p>
        </div>
      )}

      {imagesLoaded && (
        <>
          <div className="hero-container" ref={containerRef}>
            <div className="col c-1" ref={addColRef}>
              <div className="item" ref={addItem1Refs}>
                <NextImage
                  src="/intro/anri-p.webp"
                  alt="Anri album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem1Refs}>
                <NextImage
                  src="/intro/brother-p.webp"
                  alt="Little Brother album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem1Refs}>
                <NextImage
                  src="/intro/camp-lo-p.webp"
                  alt="Camp Lo album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem1Refs}>
                <NextImage
                  src="/intro/dilla-p.webp"
                  alt="J Dilla album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem1Refs}>
                <NextImage
                  src="/intro/doom-p.webp"
                  alt="MF Doom album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
            </div>
            <div className="col c-2" ref={addColRef}>
              <div className="item" ref={addItem2Refs}>
                <NextImage
                  src="/intro/heron-p.webp"
                  alt="Gill Scott Heron album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem2Refs}>
                <NextImage
                  src="/intro/madlib-p.webp"
                  alt="Madlib album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem2Refs}>
                <NextImage
                  src="/intro/marvin-p.webp"
                  alt="Marvin Gaye album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem2Refs}>
                <NextImage
                  src="/intro/mos-p.webp"
                  alt="Mos Def album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem2Refs}>
                <NextImage
                  src="/intro/pete-p.webp"
                  alt="Pete Rock album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
            </div>
            <div className="col c-3" ref={addColRef}>
              <div className="item" ref={addItem3Refs}>
                <NextImage
                  src="/intro/ryo-p.webp"
                  alt="Ryo Fukui album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem3Refs}>
                <NextImage
                  src="/intro/sade-p.webp"
                  alt="Sade album cover"
                  width={300}
                  height={300}
                  className="intro-img"
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
              <div className="item" ref={addItem3Refs}>
                <NextImage
                  src="/intro/souls-p.webp"
                  alt="Souls of Mischief album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem3Refs}>
                <NextImage
                  src="/intro/taeko-p.webp"
                  alt="Taeko Onuki album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
            </div>
            <div className="col c-4" ref={addColRef}>
              <div className="item" ref={addItem4Refs}>
                <NextImage
                  src="/intro/anri-p.webp"
                  alt="Anri album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem4Refs}>
                <NextImage
                  src="/intro/brother-p.webp"
                  alt="Little Brother album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem4Refs}>
                <NextImage
                  src="/intro/camp-lo-p.webp"
                  alt="Camp Lo album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem4Refs}>
                <NextImage
                  src="/intro/dilla-p.webp"
                  alt="J Dilla album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem4Refs}>
                <NextImage
                  src="/intro/doom-p.webp"
                  alt="Doom album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
            </div>
            <div className="col c-5" ref={addColRef}>
              <div className="item" ref={addItem5Refs}>
                <NextImage
                  src="/intro/heron-p.webp"
                  alt="Heron album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem5Refs}>
                <NextImage
                  src="/intro/madlib-p.webp"
                  alt="Madlib album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem5Refs}>
                <NextImage
                  src="/intro/marvin-p.webp"
                  alt="Marvin Gaye album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem5Refs}>
                <NextImage
                  src="/intro/mos-p.webp"
                  alt="Mos Def album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
              <div className="item" ref={addItem5Refs}>
                <NextImage
                  src="/intro/pete-p.webp"
                  alt="Pete Rock album cover"
                  width={300}
                  height={300}
                  className="intro-img"
                />
              </div>
            </div>
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
