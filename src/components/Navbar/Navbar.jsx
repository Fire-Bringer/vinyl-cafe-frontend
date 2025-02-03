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

    let ctx = gsap.context(() => { // Create GSAP context *inside* useEffect

      if (navRef.current) { // Check if ref is valid

        gsap.set(navRef.current, { backgroundColor: 'transparent'}); // Presets navbar background color

        gsap.to(navRef.current, {
          backgroundColor: '#541519', // Sets to new color on scroll
          duration: 0.5,
          scrollTrigger: {
            trigger: navRef.current,
            start: "top top",
            end: "top -10", // Set the animation to end as soon as it leaves top of screen
            toggleActions: "play none none reverse", // onEnter , onLeave, onEnterBack, onLeaveBack
            markers: false,
          }
        });

      };

    }, navRef); // Context attached to the ref

    return () => {
      ctx.revert(); // Clean up with context revert
    };
  }, []); // Ensures the animation only runs once

  return (
    <nav className="navbar w-full h-[90px] flex justify-between z-50 fixed top-0 left-0 border-b-2 border-b-[#423940]" ref={navRef}>
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
