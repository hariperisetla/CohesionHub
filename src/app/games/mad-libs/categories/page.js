"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";

const Games = () => {
  const [madlibsList, setMadlibsList] = useState([]);

  useEffect(() => {
    const getMadlibsList = async () => {
      const gamesRef = collection(db, "games");
      const queryGames = query(gamesRef, where("title", "==", "Mad Libs"));

      const gamesSnapshot = await getDocs(queryGames);

      if (!gamesSnapshot.empty) {
        const madlibsDoc = gamesSnapshot.docs[0];
        const categoryRef = collection(madlibsDoc.ref, "categories");

        const queryCategory = query(categoryRef);

        const querySnapshot = await getDocs(queryCategory);

        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMadlibsList(categoriesData);
      }
    };

    getMadlibsList();
  }, []); // Empty dependency array ensures the effect runs once after initial render

  return (
    <div className="bg-green-50 min-h-screen py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-semibold mb-6">
          Select your Mad Lib
        </h2>
        {console.log(madlibsList)}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {madlibsList.map((game, index) => (
            <div
              key={index}
              className="bg-green-100 p-5 rounded-lg justify-around flex flex-col shadow-md hover:shadow-lg space-y-3 transition duration-300"
            >
              <Image
                alt={game.title + " Image"}
                width={300}
                height={300}
                src={
                  game.image && game.image
                    ? game.image
                    : "https://placehold.jp/22c552/000000/300x300.png?text=" +
                      game.title
                }
                className="rounded-lg"
              />
              <h3 className="text-xl font-semibold capitalize">{game.title}</h3>
              <p className="text-gray-700">{game.description}</p>
              <div className="w-full flex justify-between items-center">
                <Link
                  href={"/games/mad-libs/categories/" + game.id}
                  className="bg-green-500 px-3 py-2 rounded-md text-white inline-block hover:bg-green-600 duration-300"
                >
                  Play Game
                </Link>
                <Link href="#" className="text-green-500 hover:underline">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
