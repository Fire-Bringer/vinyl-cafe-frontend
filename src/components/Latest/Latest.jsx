const Latest = () => {
  return (
    <section id='Latest' className="bg-background flex justify-center items-center py-20">

      <div className="h-auto w-full md:w-4/5 max-w-3xl bg-background-600 flex flex-col items-center justify-center md:rounded-[20px] py-4">

        <h2 className="font-display text-4xl">Latest</h2>

        <div src="#" className="mt-4 w-4/5 aspect-video">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/-406S2Rp_20?si=Bo7vTEz6Wqpq5Dvf" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

        <h3 className="mt-4 font-body text-xl font-medium">Event Title</h3>

        <h6 className="mt-2 font-body text-lg font-thin">Date</h6>

        <h4 className="mt-2 font-body text-base font-normal ">Event Performers</h4>

      </div>

    </section>
  );
};

export default Latest;
