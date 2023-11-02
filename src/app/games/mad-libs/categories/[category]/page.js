"use client";
import React, { useState } from "react";
import madlibsList from "@/data/mad-libs.json";

export default function Page({ params }) {
  // Create a state to manage the current madlib being displayed
  const [currentMadlib, setCurrentMadlib] = useState(null);

  // Create a state to store user-entered words
  const [wordInputs, setWordInputs] = useState({});

  // Function to handle word input changes
  const handleWordInputChange = (e, madlibId, wordIndex) => {
    const value = e.target.value;
    setWordInputs((prevInputs) => ({
      ...prevInputs,
      [madlibId]: {
        ...(prevInputs[madlibId] || {}),
        [wordIndex]: value,
      },
    }));
  };

  // Function to generate and display the story with the entered words
  const generateStory = (madlib) => {
    const words = wordInputs[madlib.id] || [];
    let storyWithWords = madlib.story;

    madlib.words.forEach((word, index) => {
      const regex = new RegExp("___", "i"); // Use a case-insensitive regex
      const wordToInsert = words[index] || "___";

      // Replace the "___" with the word wrapped in span tags with Tailwind classes
      storyWithWords = storyWithWords.replace(
        regex,
        `<span class="font-bold underline">${wordToInsert}</span>`
      );
    });

    return (
      <p
        dangerouslySetInnerHTML={{
          __html: storyWithWords,
        }}
      ></p>
    );
  };

  // Function to display the story and hide the form
  const displayStory = (madlib) => {
    setCurrentMadlib(madlib);
  };

  // Function to go back to the form
  const goBackToForm = () => {
    setCurrentMadlib(null);
  };

  // Filter the madlibsList based on the category
  const selectedMadlib = madlibsList.find(
    (madlib) => madlib.id === params.category
  );

  return (
    <div className="pt-16 pb-10 px-3 container mx-auto w-full max-w-3xl text-3xl">
      {currentMadlib ? (
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-bold">{currentMadlib.title}</h3>
          <p className="text-justify leading-loose ">
            {generateStory(currentMadlib)}
          </p>
          <button
            onClick={goBackToForm}
            className="bg-amber-500 p-2 text-xl rounded-md"
          >
            Go Back
          </button>
        </div>
      ) : selectedMadlib ? (
        <div
          key={selectedMadlib.id}
          className="space-y-5 flex flex-col items-center"
        >
          <h3 className="text-2xl font-bold">{selectedMadlib.title}</h3>
          <form
            className="space-y-5 capitalize"
            onSubmit={(e) => {
              e.preventDefault();
              displayStory(selectedMadlib);
            }}
          >
            {selectedMadlib.words.map((word, index) => (
              <div key={index}>
                <label>{word}: </label>
                <input
                  type="text"
                  value={wordInputs[selectedMadlib.id]?.[index] || ""}
                  onChange={(e) =>
                    handleWordInputChange(e, selectedMadlib.id, index)
                  }
                  className="outline-none border-b-2 border-b-black"
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-green-500 p-2 text-xl rounded-md"
            >
              Generate Story
            </button>
          </form>
        </div>
      ) : (
        "not found"
      )}
    </div>
  );
}
