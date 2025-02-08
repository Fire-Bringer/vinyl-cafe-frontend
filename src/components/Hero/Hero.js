import gsap from "gsap";

// Hero Slider

document.addEventListener('DOMContentLoaded', () => {
  // Select main image and preview images
  const mainImg = document.getElementById('main-img');
  const previewImgs = document.querySelectorAll('.hero-footer .intro-img');
  const prevIcon = document.getElementById('icon-prev');
  const nextIcon = document.getElementById('icon-next');
  const slideNum = document.querySelector('.slide-num p');

  // Variables to track current index
  let currentIndex = 0;

  // Function to update the main image and slide number
  function updateImage(index) {
    gsap.to(mainImg, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        mainImg.src = previewImgs[index].src;
        gsap.to(mainImg, { duration: 1, opacity: 1 });
      }
    });
    slideNum.innerHTML = `${index + 1} &mdash; ${previewImgs.length}`;
  }

  // Event listeners for the icons
  prevIcon.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : previewImgs.length - 1;
    updateImage(currentIndex);
  });

  nextIcon.addEventListener('click', () => {
    currentIndex = (currentIndex < previewImgs.length - 1) ? currentIndex + 1 : 0;
    updateImage(currentIndex);
  });

  // Set up a timeline for automatic switching
  let tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });

  previewImgs.forEach((img, index) => {
    tl.to(mainImg, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        mainImg.src = img.src;
      }
    })
    .to(mainImg, { duration: 1, opacity: 1 })
    .to(".slide-num p", {
      text: `${index + 1} &mdash; ${previewImgs.length}`,
      duration: 10
    }, "<");
  });
});
