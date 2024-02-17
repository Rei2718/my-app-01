import React from "react";
import Image from "next/image";

export default function CARD03() {
  return (
    <>
      <div className="h-max w-full max-w-sm px-5 mx-auto">
        <div className="p-4">
          <div className="border-t-1 border-b-2 border-[#81d8d0] h-0 w-full"></div>
        </div>
          <div className="flex flex-col rounded-xl shadow-lg">
          <Image
            className="w-full h-auto rounded-t-xl"
            src="/img003.jpg"
            alt="Image Description"
            width={1920}
            height={1080}
          />
          <div className="flex flex-col p-3 bg-white rounded-b-xl">

            {/* TITLE */}
            <h3 className="text-[#436E6C] p-2 text-center text-sm font-bold">
              {`Twenty Thousand Leagues Under the Sea`}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-[#436E6C]  p-2 text-xs text-center">
              {`Experience a mysterious undersea exploration mission in a small submersible.`}
            </p>

            {/* LIST */}
            <ul className="w-full text-center">
              <li
                className="text-md text-yellow-400 w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-2">
                プレミアアクセス対象
              </li>
              <li
                className="text-md text-[#436E6C] w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-2 dark:border-opacity-50">
                12:00 ~ 12:30
              </li>
              <li
                className="text-[#436E6C]  w-full border-neutral-100 border-opacity-100 px-6 py-2 dark:border-opacity-50">
                <div className="text-xs">WAIT TIME  </div>
                <a className="text-4xl">10</a> 
                <div className="text-xs"> MINUTES</div>
              </li>
            </ul>

            {/* BUTTON */}
            <div className="p-3">
              <button className="text-md flex justify-center mx-auto h-8 w-22 bg-[#81d8d0] hover:bg-[#55ffee] text-white py-1 px-3 rounded-full">
                ENTRY
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}