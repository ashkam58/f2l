import React from 'react';

interface MascotProps {
  emotion?: 'happy' | 'thinking' | 'excited';
}

export const Mascot: React.FC<MascotProps> = ({ emotion = 'happy' }) => {
  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 transition-transform duration-500 hover:scale-105">
      {/* 2.5D CSS Cube Representation */}
      <div className="absolute inset-0 bg-cube-yellow border-4 border-black rounded-2xl shadow-cartoon-lg flex items-center justify-center overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
            <div className="border-r-4 border-black h-full w-full"></div>
            <div className="border-r-4 border-black h-full w-full"></div>
            <div className="h-full w-full"></div>
            
            <div className="absolute w-full h-full grid grid-rows-3">
                <div className="border-b-4 border-black w-full h-full col-span-3"></div>
                <div className="border-b-4 border-black w-full h-full col-span-3"></div>
            </div>
        </div>

        {/* Face */}
        <div className="z-10 bg-white border-4 border-black p-2 rounded-full absolute">
            {emotion === 'happy' && (
               <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-4">
                     <div className="w-3 h-3 bg-black rounded-full"></div>
                     <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  <div className="w-8 h-4 border-b-4 border-black rounded-full"></div>
               </div>
            )}
             {emotion === 'thinking' && (
               <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-4">
                     <div className="w-3 h-1 bg-black rounded-full"></div>
                     <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  <div className="w-4 h-4 border-4 border-black rounded-full"></div>
               </div>
            )}
             {emotion === 'excited' && (
               <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-4">
                     <div className="text-black font-bold text-xl">^</div>
                     <div className="text-black font-bold text-xl">^</div>
                  </div>
                  <div className="w-8 h-6 bg-black rounded-b-full"></div>
               </div>
            )}
        </div>
      </div>
      
      {/* Decorative "Top" face for 3D effect */}
      <div className="absolute -top-4 left-4 w-full h-4 bg-cube-blue border-4 border-black skew-x-[45deg] origin-bottom-left -z-10 rounded-tr-lg"></div>
      <div className="absolute top-0 -right-4 w-4 h-full bg-cube-red border-4 border-black skew-y-[45deg] origin-top-left -z-10 rounded-br-lg"></div>
    </div>
  );
};