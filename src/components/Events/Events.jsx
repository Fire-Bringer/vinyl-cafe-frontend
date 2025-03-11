"use client"
import Image from "next/image"
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const Events = () => {
  // Refs for animations
  const mainFlyerRef = useRef(null)
  const flyerContentRef = useRef(null)

  const [currentFlyerIndex, setCurrentFlyerIndex] = useState(0)

  // Add these new state variables after the existing state declarations
  const [autoPlay, setAutoPlay] = useState(true)
  const autoPlayIntervalRef = useRef(null)

  // Your flyerImages array remains the same
  const flyerImages = [
    {
      src: "/avalanche-ig.jpg",
      alt: "Avalanche 18 event image",
      date: "9/4",
      day: "SAT",
      title: "Sounds from the Underground",
      time: "OPEN 16:00-22:00",
      details:
        "Sounds from the Underground explodes with raw energy. Dive into a night of electrifying live bands, each unleashing their unique sound. Feel the pulse of the city as DJs spin gritty beats, weaving genres into a sonic tapestry. Discover hidden talent, embrace the vibrant underground scene, and lose yourself in the music's raw power.",
    },
    {
      src: "/choco-party.jpg",
      alt: "Chocolate party event image",
      date: "5/24",
      day: "FRI",
      title: "The Chocolate Party",
      time: "OPEN 19:00-23:00",
      details:
        "Indulge your senses at The Chocolate Party, a feast for the soul and sweet tooth. Witness captivating dancers, mesmerizing visual artists, and soulful musicians intertwine their talents. Savor an endless array of decadent chocolate desserts, a symphony of flavors. Immerse yourself in a world where art and chocolate collide, creating a truly unforgettable experience.",
    },
    {
      src: "/avalanche-10.jpg",
      alt: "Avalanche 10 event image",
      date: "10/15",
      day: "SUN",
      title: "AVALANCHE X",
      time: "OPEN 17:00-22:00",
      details:
        "AVALANCHE unleashes a torrent of raw rock energy. Brace for a night of thunderous riffs and pounding drums as live bands ignite the stage. Feel the seismic power of their music, a relentless wave of sound. Dive into the heart of rock's resurgence, where every chord reverberates with untamed passion. Join the surge, and let the avalanche sweep you away.",
    },
    {
      src: "/babel-10.jpg",
      alt: "Babel event image",
      date: "8/10",
      day: "FRI",
      title: "BABEL X",
      time: "OPEN 18:30-23:00",
      details:
        "Babel unites hip-hop and R&B in a warm, inviting embrace. Feel the smooth rhythms and lyrical flow as artists take the stage. Experience a night of soulful melodies and vibrant energy, where connection thrives. Witness the raw talent of a closing cypher, where artists spontaneously weave words and beats. Join the collective, and find your voice in Babel's harmonious blend.",
    },
  ]

  // Navigation handlers with direct onClick implementation
  const handlePrev = () => {
    // Clear any existing interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
    }

    const newIndex = currentFlyerIndex > 0 ? currentFlyerIndex - 1 : flyerImages.length - 1
    animateTransition(newIndex)

    // Optionally restart autoplay after user interaction
    // Remove these 2 lines if you want manual interaction to permanently stop autoplay
    setAutoPlay(true)
  }

  const handleNext = () => {
    // Clear any existing interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
    }

    const newIndex = currentFlyerIndex < flyerImages.length - 1 ? currentFlyerIndex + 1 : 0
    animateTransition(newIndex)

    // Optionally restart autoplay after user interaction
    // Remove these 2 lines if you want manual interaction to permanently stop autoplay
    setAutoPlay(true)
  }

  // Combined animation function to reduce complexity
  const animateTransition = (newIndex) => {
    if (!mainFlyerRef.current || !flyerContentRef.current) return

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf(mainFlyerRef.current)
    gsap.killTweensOf(flyerContentRef.current)

    // Create a timeline for better synchronization
    const tl = gsap.timeline()

    // Animate flyer out
    tl.to(mainFlyerRef.current, {
      duration: 0.7,
      opacity: 0.3,
      scale: 0.95,
      ease: "power2.out",
    })

    // Animate content out
    tl.to(
      flyerContentRef.current,
      {
        duration: 0.7,
        x: 50,
        opacity: 0,
        ease: "power2.out",
      },
      "<",
    )

    // Update state after animations out
    tl.call(() => setCurrentFlyerIndex(newIndex))

    // Animate flyer in
    tl.to(mainFlyerRef.current, {
      duration: 0.7,
      opacity: 1,
      scale: 1,
      ease: "power2.in",
    })

    // Animate content in
    tl.to(
      flyerContentRef.current,
      {
        duration: 0.7,
        x: 0,
        opacity: 1,
        ease: "power2.in",
      },
      "<",
    )
  }

  // Cleanup GSAP animations on unmount
  useEffect(() => {
    return () => {
      if (mainFlyerRef.current) gsap.killTweensOf(mainFlyerRef.current)
      if (flyerContentRef.current) gsap.killTweensOf(flyerContentRef.current)
    }
  }, [])

  // Add this useEffect hook for the auto-rotation timer
  // Place it before the return statement
  useEffect(() => {
    // Start the interval if autoPlay is true
    if (autoPlay) {
      autoPlayIntervalRef.current = setInterval(() => {
        const newIndex = currentFlyerIndex < flyerImages.length - 1 ? currentFlyerIndex + 1 : 0
        animateTransition(newIndex)
      }, 5000) // Change slide every 5 seconds
    }

    // Clear the interval when component unmounts or autoPlay changes
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [autoPlay, currentFlyerIndex, flyerImages.length])

  // Get current flyer data
  const currentFlyer = flyerImages[currentFlyerIndex]

  return (
    <section id="Events" className="h-auto flex flex-col items-center md:mb-20 lg:mb-40">
      {/* Event Backdrop */}
      <div className="-z-10 mt-4 relative w-full h-[20rem] md:h-[25rem] bg-[url(/hero/vinyl_cafe5.webp)] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00000080] to-[#54151980]"></div>
      </div>

      {/* Dark Background */}
      <div className="bg-background-600 w-full h-[20rem] hidden md:block" />

      {/* Main Container */}
      <div className="-mt-72 md:-mt-[40rem] mb-20 flex flex-col justify-center items-center">
        {/* Event Header & Sliders */}
        <div className="w-4/5 md:w-full flex justify-between text-primary">
          <h2 className="font-display text-center text-4xl self-center t-shadower">Events</h2>

          <div className="flex justify-center gap-8">
            <button
              className="p-2 rounded-full text-secondary bg-primary border shadower"
              onClick={handlePrev}
              aria-label="Previous event"
            >
              <RiArrowLeftLine width="20" height="20" />
            </button>
            <button
              className="p-2 rounded-full text-secondary bg-primary shadower"
              onClick={handleNext}
              aria-label="Next event"
            >
              <RiArrowRightLine width="20" height="20" />
            </button>
            {/*
            <button
              className={`p-2 rounded-full text-secondary ${autoPlay ? 'bg-green-500' : 'bg-primary'} shadower`}
              onClick={() => setAutoPlay(!autoPlay)}
              aria-label={autoPlay ? "Pause auto-rotation" : "Start auto-rotation"}
            >
              {autoPlay ? "⏸️" : "▶️"}
            </button>
            */}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-2 lg:gap-4 w-full mt-4">
          {/* Event Flyer */}
          <div className="w-[18rem] lg:w-[25rem] relative mb-[25rem] md:mb-0" ref={mainFlyerRef}>
            {flyerImages.map((flyer, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${
                  index === currentFlyerIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
                }`}
              >
                <Image
                  src={flyer.src || "/placeholder.svg"}
                  alt={flyer.alt}
                  width={1080}
                  height={1350}
                  priority={index === 0} // Only prioritize the first image
                  className="w-full object-contain rounded-[20px] shadower"
                />
              </div>
            ))}
          </div>

          {/* Event Details */}
          <div
            className="bg-background-600 md:bg-background shadower w-full md:w-[20rem] lg:w-[25rem] h-auto font-body flex flex-col items-center justify-center md:rounded-[20px] p-8"
            ref={flyerContentRef}
          >
            {/* Details Container */}
            <div className="w-4/5 md:w-full">
              <div className="event-date flex gap-2">
                <h3 className="text-xl">{currentFlyer.date}</h3>
                <h4 className="text-base">{currentFlyer.day}</h4>
              </div>

              <h3 className="mt-2 text-xl">{currentFlyer.title}</h3>

              <h5 className="mt-2 text-xs">{currentFlyer.time}</h5>

              <p className="mt-4 text-base">{currentFlyer.details}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events
