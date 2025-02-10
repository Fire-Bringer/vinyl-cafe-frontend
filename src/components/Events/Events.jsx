'use client';
import Image from "next/image";
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';

const Events = () => {

  // Slider Definitions
  const mainFlyerRef = useRef(null);
  const prevArrowRef = useRef(null);
  const nextArrowRef = useRef(null);
  const flyerContentRef = useRef(null);

  const [mainFlyerSrc, setMainFlyerSrc] = useState('/avalanche-ig.jpg');
  const [eventDate, setEventDate] = useState('9/4');
  const [eventDay, setEventDay] = useState('SAT');
  const [eventTitle, setEventTitle] = useState('Sounds from the Underground');
  const [eventTime, setEventTime] = useState('OPEN 16:00-22:00');
  const [eventDetails, setEventDetails] = useState('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');

  const flyerImages = [
    {
      src: '/avalanche-ig.jpg',
      alt: 'Avalanche 18 event image',
      date: '9/4',
      day: 'SAT',
      title: 'Sounds from the Underground',
      time: 'OPEN 16:00-22:00',
      details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      src: '/choco-party.jpg',
      alt: 'Chocolate party event image',
      date: '5/24',
      day: 'FRI',
      title: 'The Chocolate Party',
      time: 'OPEN 19:00-23:00',
      details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      src: '/avalanche-ig.jpg',
      alt: 'Avalanche 18 event image',
      date: '9/4',
      day: 'SAT',
      title: 'Sounds from the Underground',
      time: 'OPEN 16:00-22:00',
      details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      src: '/choco-party.jpg',
      alt: 'Chocolate party event image',
      date: '5/24',
      day: 'FRI',
      title: 'The Chocolate Party',
      time: 'OPEN 19:00-23:00',
      details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
  ];

  // NEW TEST
  useEffect(() => {
    const flyerImgs = flyerImages; // Use the image data array
    const mainFlyer = mainFlyerRef.current;
    const prevArrow = prevArrowRef.current; // Get from ref
    const nextArrow = nextArrowRef.current; // Get from ref
    const flyerContentDiv = flyerContentRef.current;

    if (!mainFlyer || !flyerImgs || !prevArrow || !nextArrow || !flyerContentDiv) {
      return; // Ensure elements are available
    }

    let currentIndex = 0;

    function updateFlyer(index) {
      gsap.to(mainFlyer, {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        onComplete: () => {
          setMainFlyerSrc(flyerImgs[index].src); // Update the state!
          gsap.to(mainFlyer, { duration: 0.5, scale: 1, opacity: 1 });
        },
      });
    }

    function updateContent(index) {
      gsap.to(flyerContentDiv, {
        duration: 0.5,
        x: 100,
        opacity: 0,
        onComplete: () => {
          setEventDate(flyerImgs[index].date); // Update the state!
          setEventDay(flyerImgs[index].day);
          setEventTitle(flyerImgs[index].title);
          setEventTime(flyerImgs[index].time);
          setEventDetails(flyerImgs[index].details);
          gsap.to(flyerContentDiv, { duration: 0.5, x: 0, opacity: 1 });
        },
      });
    }

    prevArrow.addEventListener('click', () => {
      console.log('test click 1');
      currentIndex = currentIndex > 0 ? currentIndex - 1 : flyerImgs.length - 1;
      updateFlyer(currentIndex);
      updateContent(currentIndex);
    });

    nextArrow.addEventListener('click', () => {
      console.log('test click 2');
      currentIndex = currentIndex < flyerImgs.length - 1 ? currentIndex + 1 : 0;
      updateFlyer(currentIndex);
      updateContent(currentIndex);
    });

    // Set up initial image and number
    updateFlyer(0); // Show the first image initially.

  }, []);


  return (
    <section id="Events" className="h-auto flex flex-col items-center">

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
          <div className="w-[18rem] lg:w-[25rem]" ref={mainFlyerRef}>
            <Image
              src={mainFlyerSrc}
              alt="Event flyer"
              width={1080}
              height={1350}
              className="w-full object-contain rounded-[20px] shadower"
            />
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
