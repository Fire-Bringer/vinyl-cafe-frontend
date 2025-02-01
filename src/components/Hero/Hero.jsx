'use client';
import Image from 'next/image';
import '@/styles/hero.css'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {

  // DOM Element Reference Definitions
  const containerRef = useRef(null);
  const colRefs = useRef([]);
  const item1Refs = useRef([]);
  const item2Refs = useRef([]);
  const item3Refs = useRef([]);
  const item4Refs = useRef([]);
  const item5Refs = useRef([]);
  const titleRef = useRef([]);

  // Array Definitions for Grouped Dom Elements
  const addColRef = (el) => {
    if (el && !colRefs.current.includes(el)) {
      colRefs.current.push(el);
    }
  };

  const addItem1Refs = (el) => {
    if (el && !item1Refs.current.includes(el)) {
      item1Refs.current.push(el);
    }
  };
  const addItem2Refs = (el) => {
    if (el && !item2Refs.current.includes(el)) {
      item2Refs.current.push(el);
    }
  };
  const addItem3Refs = (el) => {
    if (el && !item3Refs.current.includes(el)) {
      item3Refs.current.push(el);
    }
  };
  const addItem4Refs = (el) => {
    if (el && !item4Refs.current.includes(el)) {
      item4Refs.current.push(el);
    }
  };
  const addItem5Refs = (el) => {
    if (el && !item5Refs.current.includes(el)) {
      item5Refs.current.push(el);
    }
  };


  // Animation Definition
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0 });

    // Moves all columns to the top from the bottom
    tl.to(colRefs.current, {
      top: "0",
      duration: 3,
      ease: "power4.inOut",
    });

    // Moves all images within the first column to the top
    tl.to(item1Refs.current, {
      top: "0",
      stagger: 0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=2");

    // Moves all images within the second column
    tl.to(item2Refs.current, {
      top: "0",
      stagger: -0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    // Third column
    tl.to(item3Refs.current, {
      top: "0",
      stagger: 0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    // Fourth column
    tl.to(item4Refs.current, {
      top: "0",
      stagger: -0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    // Fifth column
    tl.to(item5Refs.current, {
      top: "0",
      stagger: 0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    // Zoom animation to reveal main hero image
    tl.to(containerRef.current, {
      scale: 6,
      duration: 4,
      ease: "power4.inOut"
    }, "-=2");

    // Animation to make the hero text appear
    tl.to(titleRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    }, "-=1.5");

  }, []); // Ensures the animation only runs once



  return (
    <section className='hero' id='Home'>

      <div className='hero-container' ref={containerRef}>
        <div className='col c-1' ref={addColRef}>
          <div className='item' ref={addItem1Refs}>
            <Image
              src='/intro/anri-p.webp'
              alt='Anri album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem1Refs}>
            <Image
              src='/intro/blu-p.webp'
              alt='Blu album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem1Refs}>
            <Image
              src='/intro/brother-p.webp'
              alt='Little Brother album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem1Refs}>
            <Image
              src='/intro/camp-lo-p.webp'
              alt='Camp Lo album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem1Refs}>
            <Image
              src='/intro/dan-p.webp'
              alt='Steely Dan album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
        </div>
        <div className='col c-2' ref={addColRef}>
          <div className='item' ref={addItem2Refs}>
            <Image
              src='/intro/deltron-p.webp'
              alt='Deltron album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem2Refs}>
            <Image
              src='/intro/dilla-p.webp'
              alt='J Dilla album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem2Refs}>
            <Image
              src='/intro/doom-p.webp'
              alt='MF Doom album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem2Refs}>
            <Image
              src='/intro/glasper-p.webp'
              alt='Robert Glasper album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem2Refs}>
            <Image
              src='/intro/heron-p.webp'
              alt='Gill Scott Heron album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
        </div>
        <div className='col c-3' ref={addColRef}>
          <div className='item' ref={addItem3Refs}>
            <Image
              src='/intro/hiero-p.webp'
              alt='Hieroglyphics album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem3Refs}>
            <Image
              src='/intro/jeru-p.webp'
              alt='Jeru tha Damaja album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item main-image' ref={addItem3Refs}>
            <Image
              src='/hero/vinyl_cafe1.webp'
              alt='Shop hero image'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem3Refs}>
            <Image
              src='/intro/lauryn-p.webp'
              alt='Lauryn Hill album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem3Refs}>
            <Image
              src='/intro/madlib-p.webp'
              alt='Madlib album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
        </div>
        <div className='col c-4' ref={addColRef}>
          <div className='item' ref={addItem4Refs}>
            <Image
              src='/intro/marvin-p.webp'
              alt='Marvin Gaye album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem4Refs}>
            <Image
              src='/intro/maze-p.webp'
              alt='Maze album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem4Refs}>
            <Image
              src='/intro/mos-p.webp'
              alt='Mos Def album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem4Refs}>
            <Image
              src='/intro/outkast-p.webp'
              alt='Outkast album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem4Refs}>
            <Image
              src='/intro/pete-p.webp'
              alt='Pete Rock album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
        </div>
        <div className='col c-5' ref={addColRef}>
          <div className='item' ref={addItem5Refs}>
            <Image
              src='/intro/quasi-p.webp'
              alt='Quasimoto album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem5Refs}>
            <Image
              src='/intro/ryo-p.webp'
              alt='Ryo Fukui album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem5Refs}>
            <Image
              src='/intro/sade-p.webp'
              alt='Sade album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem5Refs}>
            <Image
              src='/intro/souls-p.webp'
              alt='Souls of Mischief album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item' ref={addItem5Refs}>
            <Image
              src='/intro/taeko-p.webp'
              alt='Taeko Onuki album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
        </div>
      </div>

      <div className='shop-title'>
        <div className='icon' id='icon-prev'></div>
        <div className='title' ref={titleRef}>
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
        <div className='icon-2' id='icon-next'></div>
      </div>

      <div className='hero-footer'>
        <div className='preview'>
          <Image
            src='/hero/vinyl_cafe1.webp'
            alt='First hero image cover'
            width={1920}
            height={1920}
            className='intro-img hero-img'
          />
          <Image
            src='/hero/vinyl_cafe2.webp'
            alt='Second hero image cover'
            width={1920}
            height={1920}
            className='intro-img hero-img'
          />
          <Image
            src='/hero/vinyl_cafe3.webp'
            alt='Third hero image cover'
            width={1920}
            height={1920}
            className='intro-img hero-img'
          />
          <Image
            src='/hero/vinyl_cafe4.webp'
            alt='Fourth hero image cover'
            width={1920}
            height={1920}
            className='intro-img hero-img'
          />
          <Image
            src='/hero/vinyl_cafe5.webp'
            alt='Fifth hero image cover'
            width={1920}
            height={1920}
            className='intro-img hero-img'
          />
        </div>

        <div className='slide-num'><p>1 &mdash; 5</p></div>
      </div>

    </section>

  );
};

export default Hero;
