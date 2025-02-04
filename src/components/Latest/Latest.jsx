const Latest = () => {
  return (
    <section id='Latest' className="h-[80vh] bg-background flex justify-center items-center">

      <div className="h-4/5 w-full md:w-4/5 max-w-3xl bg-background-600 flex flex-col items-center justify-center md:rounded-[20px]">

        <h2 className="font-display text-4xl">Latest</h2>

        <video src="#" className="mt-4 border-2 border-secondary w-4/5 rounded-[20px]"></video>

        <h3 className="mt-4 font-body text-xl font-medium">Event Title</h3>

        <h6 className="mt-2 font-body text-lg font-thin">Date</h6>

        <h4 className="mt-2 font-body text-base font-normal ">Event Performers</h4>

      </div>

    </section>
  );
};

export default Latest;
