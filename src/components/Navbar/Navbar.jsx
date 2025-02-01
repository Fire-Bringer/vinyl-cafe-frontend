'use client';
import gsap from "gsap";
import { useEffect, useRef } from "react";

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
  }, []); // Ensures the animation only runs once

  return (
    <div className="navbar w-full h-[90px] bg-secondary flex justify-between z-50 absolute top-0 left-0" ref={navRef}>
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
    </div>
  );
};

export default Navbar;
