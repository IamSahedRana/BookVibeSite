import React from 'react';
import Image from 'next/image';
import BannerImage from '@/assets/banner.png';
import Link from 'next/link';

const Banner = () => {
  return (
    <div className="bg-[#1313130d] rounded-3xl p-8 sm:p-12 lg:p-20 my-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
     
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#131313] leading-tight mb-8 lg:mb-12 max-w-lg">
            Books to freshen up your bookshelf
          </h1>
          <button className="btn bg-[#23BE0A] hover:bg-[#1f9d09] text-white font-bold text-lg border-none px-7 py-3 h-auto rounded-xl normal-case ">
            <Link href="/listed-books">
              View The List
            </Link>
          </button>
        </div>

       
        <div className="flex-1 flex justify-center lg:justify-center">
          <Image
            src={BannerImage}
            alt="Featured Book Cover"
            width={318}
            height={450}
            className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;