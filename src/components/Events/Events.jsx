import Image from "next/image";
import LeftArrow from '@/components/SVGs/Left-arrow';
import RightArrow from '@/components/SVGs/Right-arrow';

const Events = () => {
  return (
    <section id="Events" className="h-[100vh]">

      <h2 className="font-display text-center text-4xl">Events</h2>

      <div className="-z-10 mt-4 relative w-full h-[40vh] bg-[url(/hero/vinyl_cafe5.webp)] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00000080] to-[#54151980]"></div>
      </div>

      <div className="flex flex-col items-center -mt-72">

        <div className="w-3/5">
          <Image
            src="/avalanche-ig.jpg"
            alt="Event flyer"
            width={1080}
            height={1350}
            className="w-full object-contain rounded-[20px]"
          />
        </div>

        <div className="flex justify-center gap-14">
          <LeftArrow
            className="w-12"
          />
          <RightArrow
            className="w-12"
          />
        </div>
      </div>

      <div className="bg-background-600 h-[40vh] font-body flex flex-col items-center justify-center">

        <div className="w-4/5">

          <div className="event-date flex gap-2">
            <h3 className="text-xl">9/4</h3>
            <h4 className="text-base">SAT</h4>
          </div>

          <h3 className="mt-2 text-xl">Sounds from the Underground</h3>

          <h5 className="mt-2 text-xs">OPEN 16:00-22:00</h5>

          <p className="mt-4 text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

        </div>

      </div>

    </section>
  );
};

export default Events;
