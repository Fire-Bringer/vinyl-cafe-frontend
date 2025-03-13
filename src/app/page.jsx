"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar/Navbar.js"
import Hero from "@/components/Hero/Hero"
import Tags from "@/components/Tags/Tags"
import Latest from "@/components/Latest/Latest"
import Break from "@/components/Break/Break"
import About from "@/components/About/About"
import Events from "@/components/Events/Events"
import Menu from "@/components/Menu/Menu"
import Break2 from "@/components/Break/Break2"
import Gallery from "@/components/Gallery/Gallery"
import Access from "@/components/Access/Access"
import Footer from "@/components/Footer/Footer"

function Homepage() {
  const [showContent, setShowContent] = useState(false)
  const [heroAnimationComplete, setHeroAnimationComplete] = useState(false)

  // Function to control body scroll
  const setBodyScroll = (allowScroll) => {
    if (typeof document !== 'undefined') {
      if (allowScroll) {
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
      }
    }
  }

  // Handle hero completion
  const handleHeroComplete = () => {
    console.log("Hero animation complete!");
    setShowContent(true);
    // Enable scrolling after hero animation completes
    setBodyScroll(true);
  }

  // On initial load, disable scrolling
  useEffect(() => {
    // Check if this is a subsequent visit using sessionStorage
    const isSubsequentVisit = sessionStorage.getItem("hasVisitedBefore");

    if (!isSubsequentVisit) {
      // Prevent scrolling during initial hero animation
      setBodyScroll(false);
    } else {
      // For subsequent visits, we still want to show content right away
      setShowContent(true);
    }

    // Safety timeout to ensure content and scrolling eventually enabled
    const safetyTimer = setTimeout(() => {
      setShowContent(true);
      setBodyScroll(true);
    }, 20000) // Longer safety timeout to accommodate full animation

    return () => {
      clearTimeout(safetyTimer);
      // Always ensure scrolling is re-enabled when component unmounts
      setBodyScroll(true);
    };
  }, []);

  // Handle subsequent visits
  useEffect(() => {
    // Check if this is a subsequent visit using sessionStorage
    const isSubsequentVisit = sessionStorage.getItem("hasVisitedBefore")

    if (isSubsequentVisit) {
      // Skip hero animation on subsequent visits
      setShowContent(true);
      // Allow scrolling immediately for returning visitors
      setBodyScroll(true);
    } else {
      // Mark that the user has visited before
      sessionStorage.setItem("hasVisitedBefore", "true");
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar heroAnimationComplete={heroAnimationComplete} />
      <Hero
        onComplete={() => {
          console.log("Hero animation has completed!");
          setHeroAnimationComplete(true);
        }}
      />

      {showContent ? (
        <div className="content-container">
          <Tags />
          <Latest />
          <Break />
          <About />
          <Events />
          <Menu />
          <Break2 />
          <Gallery />
          <Access />
          <Footer />
        </div>
      ) : (
        <div className="loading-container py-20 flex justify-center items-center">
          <div className="loading-spinner">
            <Image
              src="/vinyl.svg"
              alt="Loading spinner"
              width={100}
              height={100}
              className="animate-spin"
              style={{ animationDuration: '3s' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Homepage
