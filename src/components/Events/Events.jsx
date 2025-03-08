'use client';
import Image from "next/image";
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import {useEffect, useRef, useState, useCallback} from 'react';
import gsap from 'gsap';

const Events = () => {
  // Your existing state and refs
  const mainFlyerRef = useRef(null);
  const prevArrowRef = useRef(null);
  const nextArrowRef = useRef(null);
  const flyerContentRef = useRef(null);

  const [currentFlyerIndex, setCurrentFlyerIndex] = useState(0);
  const [eventDate, setEventDate] = useState('9/4');
  const [eventDay, setEventDay] = useState('SAT');
  const [eventTitle, setEventTitle] = useState('Sounds from the Underground');
  const [eventTime, setEventTime] = useState('OPEN 16:00-22:00');
  const [eventDetails, setEventDetails] = useState('Lorem Ipsum is simply dummy text of the printing and typesetting industry...');

  // Your flyerImages array remains the same
  const flyerImages = [
    {
      src: '/avalanche-ig.jpg',
      alt: 'Avalanche 18 event image',
      date: '9/4',
      day: 'SAT',
      title: 'Sounds from the Underground',
      time: 'OPEN 16:00-22:00',
      details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      src: '/choco-party.jpg',
      alt: 'Chocolate party event image',
      date: '5/24',
      day: 'FRI',
      title: 'The Chocolate Party',
      time: 'OPEN 19:00-23:00',
      details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      src: '/avalanche-10.jpg',
      alt: 'Avalanche 18 event image',
      date: '10/15',
      day: 'SUN',
      title: 'AVALANCHE X',
      time: 'OPEN 17:00-22:00',
      details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      src: '/babel-10.jpg',
      alt: 'Chocolate party event image',
      date: '8/10',
      day: 'FRI',
      title: 'BABEL X',
      time: 'OPEN 18:30-23:00',
      details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
  ];

  // Create callback functions that don't change on every render
  const updateFlyer = useCallback((index) => {
    const mainFlyer = mainFlyerRef.current;
    if (!mainFlyer) return;

    // Store the animation in a variable so we can kill it if needed
    const fadeOutAnim = gsap.to(mainFlyer, {
      duration: 0.5,
      opacity: 0.3,
      scale: 0.95,
      onComplete: () => {
        setCurrentFlyerIndex(index);
        gsap.to(mainFlyer, {
          duration: 0.5,
          opacity: 1,
          scale: 1
        });
      },
    });

    // Return the animation for potential cleanup
    return fadeOutAnim;
  }, []);

  const updateContent = useCallback((index) => {
    const flyerContentDiv = flyerContentRef.current;
    if (!flyerContentDiv || !flyerImages[index]) return;

    // Store animation in variable
    const contentAnim = gsap.to(flyerContentDiv, {
      duration: 0.5,
      x: 100,
      opacity: 0,
      onComplete: () => {
        setEventDate(flyerImages[index].date);
        setEventDay(flyerImages[index].day);
        setEventTitle(flyerImages[index].title);
        setEventTime(flyerImages[index].time);
        setEventDetails(flyerImages[index].details);

        gsap.to(flyerContentDiv, {
          duration: 0.5,
          x: 0,
          opacity: 1
        });
      },
    });

    // Return the animation for potential cleanup
    return contentAnim;
  }, [flyerImages]);

  // Navigation handlers with proper callback references
  const handlePrev = useCallback(() => {
    const newIndex = currentFlyerIndex > 0 ? currentFlyerIndex - 1 : flyerImages.length - 1;
    updateFlyer(newIndex);
    updateContent(newIndex);
  }, [currentFlyerIndex, flyerImages.length, updateFlyer, updateContent]);

  const handleNext = useCallback(() => {
    const newIndex = currentFlyerIndex < flyerImages.length - 1 ? currentFlyerIndex + 1 : 0;
    updateFlyer(newIndex);
    updateContent(newIndex);
  }, [currentFlyerIndex, flyerImages.length, updateFlyer, updateContent]);

  // Setup and cleanup event listeners - only once
  useEffect(() => {
    const prevArrow = prevArrowRef.current;
    const nextArrow = nextArrowRef.current;

    if (!prevArrow || !nextArrow) return;

    // Add event listeners
    prevArrow.addEventListener('click', handlePrev);
    nextArrow.addEventListener('click', handleNext);

    // Return cleanup function that removes the EXACT SAME handler functions
    return () => {
      prevArrow.removeEventListener('click', handlePrev);
      nextArrow.removeEventListener('click', handleNext);

      // Context.clear() is another approach, but we're not using it here
      // Manually kill any ongoing animations
      gsap.killTweensOf(mainFlyerRef.current);
      gsap.killTweensOf(flyerContentRef.current);
    };
  }, [handlePrev, handleNext]); // Only re-run when handlers change (rare)

  // Initialize content on first render
  useEffect(() => {
    if (flyerImages.length > 0) {
      setEventDate(flyerImages[0].date);
      setEventDay(flyerImages[0].day);
      setEventTitle(flyerImages[0].title);
      setEventTime(flyerImages[0].time);
      setEventDetails(flyerImages[0].details);
    }
  }, []);

  // Rest of your component remains the same
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
            <button className="p-2 rounded-full text-secondary bg-primary border shadower" ref={prevArrowRef} >
              <RiArrowLeftLine width="20" height="20" />
            </button>
            <button className="p-2 rounded-full text-secondary bg-primary shadower" ref={nextArrowRef} >
              <RiArrowRightLine width="20" height="20" />
            </button>
          </div>

        </div>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-2 lg:gap-4 w-full mt-4">

          {/* Event Flyer */}
          <div className="w-[18rem] lg:w-[25rem] relative mb-[25rem] md:mb-0" ref={mainFlyerRef}>
            {flyerImages.map((flyer, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full ${
                  index === currentFlyerIndex
                    ? 'opacity-100 z-0'
                    : 'opacity-0 -z-10'
                }`}
              >
                <Image
                  src={flyer.src}
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
          <div className="bg-background-600 md:bg-background shadower w-full md:w-[20rem] lg:w-[25rem] h-auto font-body flex flex-col items-center justify-center md:rounded-[20px] p-8" ref={flyerContentRef}>

            {/* Details Container */}
            <div className="w-4/5 md:w-full">

              <div className="event-date flex gap-2">
                <h3 className="text-xl">{eventDate}</h3>
                <h4 className="text-base">{eventDay}</h4>
              </div>

              <h3 className="mt-2 text-xl">{eventTitle}</h3>

              <h5 className="mt-2 text-xs">{eventTime}</h5>

              <p className="mt-4 text-base">{eventDetails}</p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Events;
