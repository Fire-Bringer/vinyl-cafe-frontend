import Image from "next/image";
import LeftArrow from '@/components/SVGs/Left-arrow';
import RightArrow from '@/components/SVGs/Right-arrow';

const Events = () => {
  return (
    <section id="Events" className="min-h-[50vh] flex flex-col items-center">

      {/* Event Backdrop */}
      <div className="-z-10 mt-4 relative w-full h-[40vh] lg:h-[50vh] xl:h-[60vh] bg-[url(/hero/vinyl_cafe5.webp)] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00000080] to-[#54151980]"></div>
      </div>

      {/* Dark Background */}
      <div className="bg-background-600 w-full h-[20vh] hidden md:block" />

      {/* Event Header & Sliders */}
      <div className="w-4/5 lg:w-[65%] xl:w-1/2 flex justify-between text-primary -mt-80 md:-mt-[30rem] lg:-mt-96 xl:-mt-[30rem]">


        <h2 className="font-display text-center text-4xl self-center t-shadower">Events</h2>

        <div className="flex justify-center gap-8">
          <LeftArrow
            className="w-12"
            />
          <RightArrow
            className="w-12"
            />
        </div>

      </div>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-2 w-full">

        {/* Event Flyer */}
        <div className="w-3/5 md:w-1/3 xl:w-1/4">
          <Image
            src="/avalanche-ig.jpg"
            alt="Event flyer"
            width={1080}
            height={1350}
            className="w-full object-contain rounded-[20px] shadower"
          />
        </div>

        {/* Event Details */}
        <div className="bg-background-600 md:bg-background shadower w-full md:w-1/2 xl:w-1/4 h-auto font-body flex flex-col items-center justify-center md:rounded-[20px] p-8">

          {/* Details Container */}
          <div className="w-4/5 md:w-full">

            <div className="event-date flex gap-2">
              <h3 className="text-xl">9/4</h3>
              <h4 className="text-base">SAT</h4>
            </div>

            <h3 className="mt-2 text-xl">Sounds from the Underground</h3>

            <h5 className="mt-2 text-xs">OPEN 16:00-22:00</h5>

            <p className="mt-4 text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br /> <br />Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

          </div>

        </div>

      </div>


    </section>
  );
};

export default Events;
