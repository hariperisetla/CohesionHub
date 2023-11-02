import React from "react";
import Image from "next/image";

const OpeningPage = () => {
  return (
    <div className="bg-blue-400 min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/mad-libs-logo.png"
        alt="Mad Libs Logo"
        width={200}
        height={200}
      />
      <h1 className="text-4xl md:text-6xl font-bold text-white mt-4">
        Mad Libs Game
      </h1>
      <p className="text-lg md:text-xl text-white mt-2">
        Get ready to complete the word puzzles!
      </p>
      <a
        href="mad-libs/categories"
        className="mt-6 bg-white hover:text-white text-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium transition duration-300"
      >
        Start Game
      </a>
    </div>
  );
};

export default OpeningPage;
