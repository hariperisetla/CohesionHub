"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

const Games = () => {
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    const getGamesList = async () => {
      const querySnapshot = await getDocs(collection(db, "games"));
      const gamesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(querySnapshot.docs);
      setGamesList(gamesData);
    };

    getGamesList();
  }, []); // Empty dependency array ensures the effect runs once after initial render

  //   const gamesList = [
  //     {
  //       title: "Emoji Charades",
  //       description: "Act out emoji phrases while others guess!",
  //       url: "/games/emoji-charades",
  //     },
  //     {
  //       title: "Emoji Pictionary",
  //       description: "Draw emojis on a shared board for teammates to guess.",
  //     },
  //     {
  //       title: "Collaborative Guessing",
  //       description: "Team up to guess emoji phrases together.",
  //     },
  //     {
  //       title: "Trivia Quiz",
  //       description: "Answer trivia questions and compete for the highest score.",
  //     },
  //     {
  //       title: "Word Scramble",
  //       description: "Unscramble letters to form words in a limited time.",
  //     },
  //     {
  //       title: "Riddle Challenge",
  //       description:
  //         "Solve riddles to progress through an interactive storyline.",
  //     },
  //     {
  //       title: "Emoji Storytelling",
  //       description:
  //         "Create a story using only emojis in this creative challenge.",
  //     },
  //     {
  //       title: "Guess the Movie",
  //       description: "Guess the movie title based on a sequence of emoji clues.",
  //     },
  //     {
  //       title: "Emoji Bingo",
  //       description:
  //         "Complete your bingo card by guessing the correct emoji phrases.",
  //     },
  //     {
  //       title: "Emoji Trivia",
  //       description: "Answer trivia questions related to emojis and pop culture.",
  //     },
  //     // Add more game options here
  //   ];

  return (
    <div className="bg-blue-300 min-h-screen py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-semibold mb-6">
          Explore Our Games
        </h2>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {gamesList.map((game, index) => (
            <div
              key={index}
              className="bg-blue-100 p-5 rounded-lg justify-around flex flex-col shadow-md hover:shadow-lg space-y-3 transition duration-300"
            >
              <Image
                alt={game.title + " Image"}
                width={300}
                height={300}
                src={
                  game.image && game.image
                    ? game.image
                    : "https://placehold.jp/93c5fd/000000/300x300.png?text=" +
                      game.title
                }
                className="rounded-lg"
              />
              <h3 className="text-xl font-semibold capitalize">{game.title}</h3>
              <p className="text-gray-700">{game.description}</p>
              <div className="w-full flex justify-between items-center">
                <Link
                  href={game.url && game.url ? game.url : ""}
                  className="bg-blue-500 px-3 py-2 rounded-md text-white inline-block hover:bg-blue-600 duration-300"
                >
                  Play Game
                </Link>
                <Link href="#" className="text-blue-500 hover:underline">
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
