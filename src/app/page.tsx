'use client';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

function MyComponent() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const myElement = useRef(null);

  useEffect(() => {
    if (!hasAnimated && myElement.current) {
      gsap.context(() => { // Use gsap.context for easier cleanup
        gsap.fromTo(myElement.current, {
          opacity: 0,
          y: 50,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => setHasAnimated(true), //Important: Set the state after animation
        });
      }, myElement.current); //Context scope for cleanup related to myElement
    }

    return () => {
      gsap.killTweensOf(myElement.current); // Clean up tweens on unmount
    };

  }, [hasAnimated]); // Important: Include hasAnimated in the dependency array

  return (
    <div ref={myElement} style={{ opacity: 0, position: 'relative', top: 50 }}>
      {/* Element to animate */}
      <h1>Welcome!</h1>
      <p>This animation will only play on the first load.</p>
    </div>
  );
}

export default MyComponent;
