import Image from "next/image";

const Break = () => {
  return (
    <div className="w-full h-[40vh]">
      <Image
        src={'/hero/vinyl_cafe4.webp'}
        alt="Vinyl shop image"
        width={1920}
        height={1000}
        className="w-full object-cover"
      />
    </div>
  );
};

export default Break;
