import Image from 'next/image';
import { Compass } from './svg';

export default function TiltedCardsAnimation() {
  return (
    <section className="relative flex items-center justify-center py-16 h-[482px] m-auto scale-90">
      <div className="text-background absolute top-1/2 -translate-y-1/2 z-20">
        <h1 className="sr-only">Compass</h1>
        <Compass />
      </div>

      <Image
        src="https://rstr.in/google/tripedia/g2i0BsYPKW-"
        alt="Beach destination"
        height={300}
        width={300}
        className="object-cover w-[250px] h-[342px] rounded-xl absolute left-0 bottom-20 animate-tilt-left bg-gray-200"
        priority
      />

      <div className="relative w-[275px] h-[482px] rounded-xl overflow-hidden z-10">
        <Image
          src="https://rstr.in/google/tripedia/pHfPmf3o5NU"
          alt="Compass"
          height={500}
          width={500}
          className="object-cover w-full h-full bg-gray-200"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60" />
      </div>

      <Image
        src="https://rstr.in/google/tripedia/980sqNgaDRK"
        alt="Hollywood destination"
        height={300}
        width={300}
        className="object-cover w-[245px] h-[312px] rounded-xl absolute right-0 bottom-10 animate-tilt-right bg-gray-200"
        priority
      />
    </section>
  );
}
