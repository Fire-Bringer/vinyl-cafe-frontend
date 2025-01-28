'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

function Hero() {
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
          ease: 'power2.out',
          onComplete: () => setHasAnimated(true), //Important: Set the state after animation
        });
      }, myElement.current); //Context scope for cleanup related to myElement
    }

    return () => {
      gsap.killTweensOf(myElement.current); // Clean up tweens on unmount
    };

  }, [hasAnimated]); // Important: Include hasAnimated in the dependency array

  return (
    /*
    <div ref={myElement} style={{ opacity: 0, position: 'relative', top: 50 }}>
      <h1>Welcome!</h1>
      <p>This animation will only play on the first load.</p>
    </div>
    */

    // Original HTML
    <section className='hero' id='Home'>

      <div className='hero-container'>
        <div className='col c-1'>
          <div className='item'>
            <Image
              src='/images/intro/anri-p.webp'
              alt='Anri album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/blu-p.webp'
              alt='Blu album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/brother-p.webp'
              alt='Little Brother album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/camp-lo-p.webp'
              alt='Camp Lo album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/dan-p.webp'
              alt='Steely Dan album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
        </div>
        <div className='col c-2'>
          <div className='item'>
            <Image
              src='/images/intro/deltron-p.webp'
              alt='Deltron album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/dilla-p.webp'
              alt='J Dilla album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/doom-p.webp'
              alt='MF Doom album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/glasper-p.webp'
              alt='Robert Glasper album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/heron-p.webp'
              alt='Gill Scott Heron album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
        </div>
        <div className='col c-3'>
          <div className='item'>
            <Image
              src='/images/intro/hiero-p.webp'
              alt='Hieroglyphics album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/jeru-p.webp'
              alt='Jeru tha Damaja album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item main-image'>
            <Image
              src='/images/hero/vinyl_cafe5.webp'
              alt='Shop hero image'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/lauryn-p.webp'
              alt='Lauryn Hill album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/madlib-p.webp'
              alt='Madlib album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
        </div>
        <div className='col c-4'>
          <div className='item'>
            <Image
              src='/images/intro/marvin-p.webp'
              alt='Marvin Gaye album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/maze-p.webp'
              alt='Maze album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/mos-p.webp'
              alt='Mos Def album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/outkast-p.webp'
              alt='Outkast album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/pete-p.webp'
              alt='Pete Rock album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
        </div>
        <div className='col c-5'>
          <div className='item'>
            <Image
              src='/images/intro/quasi-p.webp'
              alt='Quasimoto album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/ryo-p.webp'
              alt='Ryo Fukui album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/sade-p.webp'
              alt='Sade album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/souls-p.webp'
              alt='Souls of Mischief album cover'
              width={1920}
              height={1920}
              className='intro-img'
            />
          </div>
          <div className='item'>
            <Image
              src='/images/intro/taeko-p.webp'
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
        <div className='title'>
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
            src='/images/hero/vinyl_cafe1.webp'
            alt='First hero image cover'
            width={1920}
            height={1920}
            className='intro-img hero-img'
          />
          <Image
            src='/images/hero/vinyl_cafe2.webp'
            alt='Second hero image cover'
            width={1920}
            height={1920}
            className='intro-img hero-img'
          />
          <Image
            src='/images/hero/vinyl_cafe3.webp'
            alt='Third hero image cover'
            width={1920}
            height={1920}
            className='intro-img hero-img'
          />
          <Image
            src='/images/hero/vinyl_cafe4.webp'
            alt='Fourth hero image cover'
            width={1920}
            height={1920}
            className='intro-img hero-img'
          />
          <Image
            src='/images/hero/vinyl_cafe5.webp'
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
