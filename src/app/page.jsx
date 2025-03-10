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

  // Handle hero completion
  const handleHeroComplete = () => {
    setShowContent(true)
  }

  // Safety timeout to ensure content eventually shows
  useEffect(() => {
    // Show content after 7 seconds regardless of hero status
    const safetyTimer = setTimeout(() => {
      setShowContent(true)
    }, 7000)

    return () => clearTimeout(safetyTimer)
  }, [])

  // Handle subsequent visits
  useEffect(() => {
    // Check if this is a subsequent visit using sessionStorage
    const isSubsequentVisit = sessionStorage.getItem("hasVisitedBefore")

    if (isSubsequentVisit) {
      // Skip hero animation on subsequent visits
      setShowContent(true)
    } else {
      // Mark that the user has visited before
      sessionStorage.setItem("hasVisitedBefore", "true")
    }

    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />
      <Hero onComplete={handleHeroComplete} />

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
