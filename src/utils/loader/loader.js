import gsap from "gsap";

document.addEventListener('DOMContentLoaded', () => {
  // Select all images inside .hero-container
  const images = document.querySelectorAll('.hero-container img');

  // Create an array of promises that resolve when each image is loaded
  const imagePromises = Array.from(images).map((img) => {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve(); // Image is already loaded
      } else {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve); // In case an image fails to load
      }
    });
  });

  // Wait for all images to load before starting the GSAP timeline
  Promise.all(imagePromises).then(() => {
    console.log("All images loaded");

    // Start GSAP timeline animation
    let tl = gsap.timeline({ delay: 0 });

    tl.to(".col", {
      top: "0",
      duration: 3,
      ease: "power4.inOut"
    });

    tl.to(".c-1 .item", {
      top: "0",
      stagger: 0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=2");

    tl.to(".c-2 .item", {
      top: "0",
      stagger: -0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-3 .item", {
      top: "0",
      stagger: 0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-4 .item", {
      top: "0",
      stagger: -0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-5 .item", {
      top: "0",
      stagger: 0.25,
      duration: 3,
      ease: "power4.inOut"
    }, "-=4");

    tl.to(".hero-container", {
      scale: 6,
      duration: 4,
      ease: "power4.inOut"
    }, "-=2");

    tl.to(".slide-num p, .preview img", {
      top: 0,
      stagger: 0.075,
      duration: 1,
      ease: "power3.out",
    }, "-=1.5");

    tl.to(".title", {
      opacity: 1,  /* Fade in */
      duration: 1,
      ease: "power3.out",
    }, "-=1.5");

    tl.to(".icon ion-icon, .icon-2 ion-icon", {
      scale: 1,
      stagger: 0.05,
      ease: "power3.out",
    }, "-=1");

    // New animations for .head1 and .head2
    tl.to(".head1, .head2", {
      opacity: 1,  /* Fade in */
      duration: 1,
      ease: "power3.out",
    }, "-=1.5");
  });
});
