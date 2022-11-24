import React, { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";

type TDeck = {
  _id: string;
  title: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  /* It's a hook that runs when the component mounts. It's fetching the decks from the server and setting
    the state. */
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
  }, []);

  /**
   * It takes a deckId as an argument, and then it makes a DELETE request to the server, and then it
   * filters the decks array to remove the deck with the matching id
   * @param {string} deckId - string - the id of the deck to delete
   */
  async function deleteDeck(deckId: string) {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    });

    setDecks(decks.filter((deck: TDeck) => deck._id !== deckId));
  }

  /**
   * We're creating a new deck by sending a POST request to the server, and then adding the new deck to
   * the list of decks
   * @param e - React.FormEvent - this is the event that is triggered when the form is submitted.
   */
  async function createDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());

    setDecks([...decks, deck]);
    setTitle("");
  }

  return (
    <div className="bg-zinc-800  h-screen p-6">
      <div className="flex justify-center">
        <ul className="grid grid-cols-3 w-[600px] gap-3">
          {decks.map((deck: TDeck) => (
            <li
              key={deck._id}
              className="relative h-32 rounded-md bg-orange-500 shadow-md flex items-center justify-center cursor-pointer text-white hover:bg-orange-600"
            >
              <button
                className="absolute top-0 right-2"
                onClick={() => deleteDeck(deck._id)}
              >
                X
              </button>
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
            sizing="sm"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <button className="p-1 rounded-md bg-orange-500 hover:bg-orange-600 text-white mt-6 ml-3">
          Create Deck
        </button>
      </form>
    </div>
  );
}

export default App;
