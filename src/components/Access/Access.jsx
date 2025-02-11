const Access = () => {
  return (
    <section id="Access" className="flex flex-col justify-center items-center py-20">

      <h2 className="font-display text-4xl">Access</h2>

      <a href="https://www.google.com/maps/place/Kanazawa+Station/@36.5780443,136.6481714,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff8334203bb8605:0x5d5df6011ebba7ea!8m2!3d36.5780443!4d136.6481714!16zL20vMGZ3bnZr?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D" target="_blank" className="mt-4 w-4/5 xl:w-1/2 shadower rounded-[20px]">
        <img src="/map.png" alt="Map image" className="rounded-[20px]"/>
      </a>

      <h5 className="mt-6">7-77-77 Dopeland Kanazawa</h5>

      <h5>TEL: 777-777-777</h5>

      <button className="border-2 border-secondary py-4 px-10 rounded-[20px] bg-secondary text-primary font-body text-lg shadower mt-6 mb-20">Contact</button>

    </section>
  )
};

export default Access;
