'use client';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Preempt Check for SSR
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Navbar = () => {

  // Navbar ref definition
  const navRef = useRef(null);

  // Animation definition
  useEffect(() => {
    let ctx = gsap.context(() => { // Create GSAP context *inside* useEffect
      if (navRef.current) { // Check if ref is valid
        ScrollTrigger.create({
          trigger: navRef.current,
          start: "top -=90", // Gets rid of the pin-spacer gap
          pin: true,
          scrub: true,
        });

        ScrollTrigger.addEventListener("scroll", () => {
          if (ScrollTrigger.isScrolling()) {
            navRef.current.style.backgroundColor = "rgba(84, 21, 25, 0.9)";
            navRef.current.style.transition = "background-color 0.3s ease";
          } else {
            navRef.current.style.backgroundColor = "transparent";
            navRef.current.style.transition = "background-color 0.3s ease";
          }
        });

      }
    }, navRef); // Context attached to the ref

    // Sets the navbar to invisible at start
    gsap.set(navRef.current, {
      opacity: 0,
    });

    // Sets animation to reveal navbar after intro animation
    gsap.to(navRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 7,
    });

    return () => {
      ctx.revert(); // Clean up with context revert
    };
  }, []); // Ensures the animation only runs once

  return (
    <nav className="navbar w-full h-[90px] bg-secondary flex justify-between z-50 fixed top-0 left-0" ref={navRef}>
      <img
        src='/icons/vinyl-icon.svg'
        alt='Vinyl Icon'
        width={40}
        className="ml-6"
      />
      <img
        src='/icons/burger-icon.svg'
        alt='Burger menu icon'
        width={40}
        className="mr-6"
      />
    </nav>
  );
};

export default Navbar;
