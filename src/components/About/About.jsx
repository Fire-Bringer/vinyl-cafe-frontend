import '@/styles/about.css';
import IgIcon from '@/components/SVGs/Ig-Icon';
import YtIcon from '@/components/SVGs/Yt-Icon';

const About = () => {
  return (
    <section id="About" className="flex flex-col lg:flex-row items-center justify-center py-16">

      <div className="w-full lg:w-4/5 h-[90%] flex flex-col lg:flex-row justify-center items-center 2xl:px-8">

        <div className="about-text w-4/5 flex flex-col justify-around">

          <h2 className="text-center lg:text-start font-display text-4xl">About</h2>

          <p className="mt-4 font-body text-base font-normal w-4/5 md:w-full lg:w-4/5 self-center lg:self-start">
            アナログレコードとコーヒーを愛する人々のための憩いの場、ビニールカフェへようこそ。温かくメロウな音楽がヴィンテージターンテーブルで流れ、懐かしい魅力で店内を満たします。クラシックロックからソウルフルなジャズまで、厳選されたレコードを眺めながら、丁寧に淹れられたラテをお楽しみください。<br /><br />Our cozy space invites you to unwind and connect. Comfortable seating, soft lighting, and the gentle crackle of vinyl create an atmosphere of relaxed enjoyment. Share stories with friends, discover new artists, or simply savor the moment, surrounded by the timeless beauty of analog sound.
          </p>

          <div className="mt-8 border-y-2 border-secondary flex justify-center gap-10 w-1/2 md:w-1/3 lg:w-2/5 self-center lg:self-start mb-10 md:mb-0">

            <a href="#">
              <IgIcon className="about-ig py-2 md:w-10" />
            </a>

            <a href="#">
              <YtIcon className="about-yt py-2 md:w-10" />
            </a>

          </div>

        </div>

        <div className="about-video flex justify-center items-center w-full">

          <video controls muted autoPlay loop playsInline className="w-full lg:rounded-[20px] lg:w-[35rem] 2xl:w-[50rem]">
            <source src='/demo-30.mp4' type='video/mp4'></source>
            Your browser does not support the video tag.
          </video>

        </div>

      </div>

    </section>
  );
};

export default About;
