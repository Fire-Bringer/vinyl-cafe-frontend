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

const menuLinks = [
  { path: "#Home", label: "Home" },
  { path: "#Latest", label: "Latest" },
  { path: "#About", label: "About" },
  { path: "#Events", label: "Events" },
  { path: "#Menu", label: "Menu" },
  { path: "#Gallery", label: "Gallery" },
  { path: "#Access", label: "Access" },
];

const Menu = () => {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
      {/* menu-bar */}
      <div className="menu-bar bg-secondary h-[90px]">
        <div className="menu-logo">
          <Link href="/" className="text-primary"><VinylIcon fill="#541519" stroke="#D6D533"/></Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p><BurgerIcon/></p>
        </div>
      </div>

      {/* menu-overlay */}
      <div className="menu-overlay">
        {/* menu-overlay-bar */}
        <div className="menu-overlay-bar h-[90px]">
          <div className="menu-logo">
            <Link href="/"><VinylIcon fill="#DCC8AB" stroke="#541519"/></Link>
          </div>
          <div className="menu-close">
            <p onClick={toggleMenu}>Close</p>
          </div>
        </div>

        {/* menu overlay items */}
        <div className="menu-close-icon" onClick={toggleMenu}>
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div key={index} className="menu-link-item">
                <div className="menu-link-item-holder" onClick={toggleMenu}>
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
            <div className="menu-info-col">
              <p>cafe@vinyl.com</p>
              <p>777-7777-7777</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <p>Keep it Real</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
