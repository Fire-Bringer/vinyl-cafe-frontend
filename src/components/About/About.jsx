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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br /><br />Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>

          <div className="mt-8 border-y-2 border-secondary flex justify-center gap-10 w-1/2 md:w-1/3 lg:w-2/5 self-center lg:self-start mb-16 md:mb-0">

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
