"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";

const GamePage = () => {
  const [emojiPhrase, setEmojiPhrase] = useState(null);
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);
  const [clueVisible, setClueVisible] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [score, setScore] = useState(0);

  const nextEmojiPhrase = () => {
    setAnswerVisible(false);
    setCurrentEmojiIndex((prevIndex) =>
      prevIndex < emojiPhrase.length - 1 ? prevIndex + 1 : 0
    );
    setClueVisible(false);
    setScore(score + 10); // Award 10 points for moving to the next emoji phrase
  };

  const revealClue = () => {
    setClueVisible(true);
    setScore(score - 5); // Deduct 5 points for revealing the clue
  };

  const revealAnswer = () => {
    setAnswerVisible(true);
    // setScore(score - 10); // Deduct 10 points for revealing the answer
  };

  useEffect(() => {
    const fetchEmojiPhrase = async () => {
      const gamesRef = collection(db, "games");
      const queryGames = query(
        gamesRef,
        where("title", "==", "Emoji Charades")
      );
      const gamesSnapshot = await getDocs(queryGames);

      if (!gamesSnapshot.empty) {
        const emojiCharadesDoc = gamesSnapshot.docs[0];
        const categoryRef = collection(emojiCharadesDoc.ref, "categories");

        const queryCategory = query(
          categoryRef,
          where("title", "==", "famous movies")
        );

        const querySnapshot = await getDocs(queryCategory);

        if (!querySnapshot.empty) {
          const categoryDoc = querySnapshot.docs[0];
          const emojiPhrasesRef = collection(categoryDoc.ref, "emoji-phrases");
          const emojiPhrasesSnapshot = await getDocs(emojiPhrasesRef);

          if (!emojiPhrasesSnapshot.empty) {
            const emojiData = emojiPhrasesSnapshot.docs.map((doc) =>
              doc.data()
            );
            setEmojiPhrase(emojiData);
          }
        }
      }
    };
    fetchEmojiPhrase();
  }, []);

  const currentEmojiData = emojiPhrase && emojiPhrase[currentEmojiIndex];

  return (
    <div className="bg-blue-200 min-h-screen flex flex-col items-center justify-center space-y-5">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
        Emoji Charades Game
      </h1>
      <div className="text-center">
        <div className="text-7xl md:text-9xl">
          {currentEmojiData ? currentEmojiData.emoji : "🔃🔃🔃"}
        </div>
      </div>
      {clueVisible && (
        <p className="text-lg text-gray-700 mt-4">
          Clue: {currentEmojiData ? currentEmojiData.clue : ""}
        </p>
      )}

      {!clueVisible && !answerVisible && (
        <button
          onClick={revealClue}
          className="p-2 bg-red-500 text-xl text-white rounded-full hover:bg-red-600 transition duration-300"
        >
          Show Clue
        </button>
      )}

      {answerVisible && (
        <h3 className="text-2xl text-blue-700 font-semibold mt-4">
          Answer: {currentEmojiData ? currentEmojiData.answer : ""}
        </h3>
      )}

      {!answerVisible && (
        <button
          onClick={revealAnswer}
          className="p-2 bg-blue-500 text-xl text-white rounded-full hover:bg-blue-600 transition duration-300 mt-4"
        >
          Reveal Answer
        </button>
      )}
      <button
        onClick={nextEmojiPhrase}
        className="py-2 px-4 bg-green-500 text-xl text-white rounded-full hover:bg-green-600 transition duration-300 mt-4"
      >
        Next Emoji
      </button>
      <p className="text-xl font-semibold text-gray-800 mt-6">Score: {score}</p>
    </div>
  );
};

export default GamePage;
