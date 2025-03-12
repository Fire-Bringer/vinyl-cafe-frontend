"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import "@/styles/navbar.css";

import IgIcon from "../SVGs/Ig-Icon";
import YtIcon from "../SVGs/Yt-Icon";
import VinylIcon from "../SVGs/Vinyl-icon";
import BurgerIcon from "../SVGs/Burger-icon";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Preempt Check for SSR
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);
}

// Array definition for nav links
const navLinks = [
  { path: "#Home", label: "Home", targetId: "Home" },
  { path: "#Latest", label: "Latest", targetId: "Latest" },
  { path: "#About", label: "About", targetId: "About" },
  { path: "#Events", label: "Events", targetId: "Events" },
  { path: "#Menu", label: "Menu", targetId: "Menu" },
  { path: "#Gallery", label: "Gallery", targetId: "Gallery" },
  { path: "#Access", label: "Access", targetId: "Access" },
];


const Menu = ({ heroAnimationComplete = false }) => {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const navRef = useRef(null);

  const tl = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle to set offset on y access to navigate above the targeted section IDs
  const handleNavLinkClick = (targetId, offset = 0) => {
    toggleMenu();

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetY = targetElement.offsetTop + offset; // Calculate adjusted y position

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetY, autoKill: false },
        ease: "power2.inOut",
      });
    } else {
      console.error(`Element with id "${targetId}" not found!`); // For debugging
    }
  };

  // Nav animation setup
  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {

    // Trigger to open and close navbar
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }

  }, [isMenuOpen]);

  // Animation definition - now responsive to Hero animation completion
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    console.log("Hero animation complete status:", heroAnimationComplete);
    const isSubsequentVisit = sessionStorage.getItem("hasVisitedBefore");

    if (heroAnimationComplete || isSubsequentVisit) {
      // Set session storage
      if (!isSubsequentVisit) {
        sessionStorage.setItem("hasVisitedBefore", "true");
      }

      // Show navbar immediately
      setShowNavbar(true);

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (navRef.current) {
          console.log("Animating navbar");

          // Clear any existing animations
          gsap.killTweensOf(navRef.current);

          // Set initial state
          gsap.set(navRef.current, {
            opacity: 0,
            pointerEvents: "none"
          });

          // Simple animation without timeline
          gsap.to(navRef.current, {
            opacity: 1,
            visibility: "visible", // Important!
            duration: 1,
            ease: "power2.out",
            pointerEvents: "auto",
            delay: 12.5, // Delay to ensure hero animation is complete
            onComplete: () => console.log("Navbar animation complete!")
          });

          // Background color change
          gsap.context(() => {
            ScrollTrigger.create({
              trigger: navRef.current,
              start: "top top",
              end: "top -10",
              onEnter: () => {
                gsap.to(navRef.current, { backgroundColor: '#541519', duration: 0.5 });
              },
              onLeaveBack: () => {
                gsap.to(navRef.current, { backgroundColor: 'transparent', duration: 0.5 });
              }
            });
          }, navRef);
        }
      }, 100);
    }
  }, [heroAnimationComplete]);

  return (
    <div className="menu-container" ref={container}>
      {/* Add initial styling to keep it invisible until GSAP takes over */}
      {showNavbar && (
        <div
          className="menu-bar h-[90px] border-b-2 border-b-[#423940] nav-shadower"
          ref={navRef}
          style={{ opacity: 0, visibility: "hidden" }} // Initial invisible state
        >
          <div className="menu-logo">
            <Link href="/" className="text-primary"><VinylIcon fill="transparent" stroke="#D6D533"/></Link>
          </div>
          <div className="menu-open" onClick={toggleMenu}>
            <p><BurgerIcon/></p>
          </div>
        </div>
      )}

      {/* menu-overlay */}
      <div className="menu-overlay">
        {/* menu-overlay-bar */}
        <div className="menu-overlay-bar h-[90px]">
          <div className="menu-logo">
            <Link href="/"><VinylIcon fill="#DCC8AB" stroke="#541519"/></Link>
          </div>
          <div className="menu-close">
            <p onClick={toggleMenu} className="font-body text-secondary">Close</p>
          </div>
        </div>

        {/* menu overlay items */}
        <div className="menu-close-icon" onClick={toggleMenu}>
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy mb-24 md:mb-0">
          <div className="menu-links">
            {navLinks.map((link, index) => (
              <div key={index} className="menu-link-item">
                <div className="menu-link-item-holder" onClick={() => handleNavLinkClick(link.targetId, -100)}> {/* Example: 100px above */}
                  <Link className="menu-link" href={link.path}>
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#"><IgIcon/></a>
              <a href="#"><YtIcon/></a>
            </div>
            <div className="menu-info-col font-body ml-6">
              <p>cafe@vinyl.com</p>
              <p>777-7777-7777</p>
            </div>
          </div>
        </div>
        <div className="menu-preview font-body mb-24 md:mb-0">
          <p>Keep it Real</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
