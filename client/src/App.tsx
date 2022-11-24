import React, { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";

type TDeck = {
  _id: string;
  title: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const newDecks = await fetch("http://localhost:5000/decks").then(
        (response) => response.json()
      );
      setDecks(newDecks);
    })();

    //Allows us to cancel fetch requests
    return () => {
      abortController.abort();
    };
  }, [decks]);

  async function createDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    setTitle("");
  }

  return (
    <div className="bg-zinc-800  h-screen p-6">
      <div className="flex justify-center">
        <ul className="grid grid-cols-3 w-[600px] gap-3">
          {decks.map((deck: TDeck) => (
            <li
              key={deck._id}
              className="h-32 rounded-md bg-orange-500 shadow-md flex items-center justify-center cursor-pointer text-white hover:bg-orange-600"
            >
              {deck.title}
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={createDeck}
        className="flex justify-center items-center mt-6"
      >
        <div>
          <Label
            htmlFor="small"
            value="Create Decks"
            className="text-orange-500"
          />
          <TextInput
            type="text"
            id="deck-title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <button className="px-3 py-2 ml-3 mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-md">
          Create Deck
        </button>
      </form>
    </div>
  );
}

export default App;
