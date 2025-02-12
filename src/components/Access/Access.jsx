'use client';
import Contact from '@/components/Contact/Contact';
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const Access = () => {
  const modalContactRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal open/close

  const openModal = () => {
    setIsModalOpen(true); // Set state first
  };

  const closeModal = () => {
    setIsModalOpen(false); // Set state first
  };

  useEffect(() => {
    if (isModalOpen) {
        gsap.to(modalContactRef.current, { scale: 1, opacity: 1, duration: 0.5, pointerEvents: "auto" });
    } else {
        // Only animate when isModalOpen becomes false *after* it has been true
        if (modalContactRef.current && modalContactRef.current.style.scale !== "0") {  // Check if it has been opened
            gsap.to(modalContactRef.current, { scale: 0, opacity: 0, duration: 0.5, pointerEvents: "none"});
        } else {
            // For the very first render, just set the styles directly (no animation)
            if (modalContactRef.current) {
                modalContactRef.current.style.scale = 0;
                modalContactRef.current.style.opacity = 0;
                modalContactRef.current.style.pointerEvents = "none";
            }
        }
    }
  }, [isModalOpen]);

  return (
    <section id="Access" className="flex flex-col justify-center items-center pt-16">

      <h2 className="font-display text-4xl">Access</h2>

      <a href="https://www.google.com/maps/place/Kanazawa+Station/@36.5780443,136.6481714,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8334203bb8605:0x5d5df6011ebba7ea!8m2!3d36.5780443!4d136.6481714!16zL20vMGZ3bnZr?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D" target="_blank" className="mt-4 w-4/5 xl:w-1/2 shadower rounded-[20px]">
        <img src="/map.png" alt="Map image" className="rounded-[20px]"/>
      </a>

      <h5 className="mt-6">7-77-77 Dopeland Kanazawa</h5>

      <h5>TEL: 777-777-777</h5>

      <button
        className="border-2 border-secondary py-4 px-10 rounded-[20px] bg-secondary text-primary font-body text-lg shadower mt-6 mb-20"
        onClick={() => openModal()}
      >
        Contact
      </button>

      {/* Modal */}
      <div
        ref={modalContactRef}
        className={`fixed top-0 left-0 w-full h-full bg-secondary/80 z-50 flex items-center justify-center transition-opacity duration-500 ${isModalOpen ? 'flex' : 'hidden'}`} // Use state for classes
        onClick={(e) => { // Close only if click is directly on the backdrop
          if (e.target === modalContactRef.current) {
            closeModal();
          }
        }}
      >
        {isModalOpen && (
          <Contact
            onClose={closeModal} // Pass the closeModal function as a prop
            onClick={(e) => e.stopPropagation()} // Keep this!
            className="bg-background-600 rounded-[20px] p-4 max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[30%] max-h-[80%] overflow-hidden"
          />
        )}
      </div>

    </section>
  )
};

export default Access;
