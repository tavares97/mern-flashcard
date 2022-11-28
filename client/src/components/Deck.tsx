import React, { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";

import { getDeck } from "../api/getDeck";
import { createCard } from "../api/createCard";
import { TDeck } from "../api/getDecks";
import { deleteCard } from "../api/deleteCard";

export const Deck = () => {
  const [text, setText] = useState("");
  const [cards, setCards] = useState<string[]>([]);
  const [deck, setDeck] = useState<TDeck | undefined>();

  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      if (!deckId) return;
      const newDeck = await getDeck(deckId!);

      setDeck(newDeck);
      setCards(newDeck.cards);
    })();

    //Allows us to cancel fetch requests
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  /**
   * It takes a deckId as an argument, and then it makes a DELETE request to the server, and then it
   * filters the decks array to remove the deck with the matching id
   * @param {string} deckId - string - the id of the deck to delete
   */
  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);

    setCards(newDeck.cards);
  }

  /**
   * We're creating a new deck by sending a POST request to the server, and then adding the new deck to
   * the list of decks
   * @param e - React.FormEvent - this is the event that is triggered when the form is submitted.
   */
  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    if (text === "") return;

    const { cards } = await createCard(deckId!, text);
    setCards(cards);
    setText("");
  }

  return (
    <div className="h-screen p-6">
      <p className="text-3xl text-white text-center mb-6">
        DECK - {deck?.title}
      </p>
      <div className="flex justify-center">
        <ul className="grid grid-cols-3 w-[500px] gap-3">
          {cards.map((card: string, idx: number) => (
            <li
              key={card}
              className="relative h-20 rounded-md bg-orange-500 shadow-md flex items-center justify-center cursor-pointer text-white hover:bg-orange-600"
            >
              <button
                className="absolute top-0 right-2"
                onClick={() => handleDeleteCard(idx)}
              >
                X
              </button>
              {card}
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={handleCreateCard}
        className="flex justify-center items-center mt-6"
      >
        <div>
          <Label
            htmlFor="card-title"
            value="Create Cards"
            color=""
            className="text-orange-300"
          />
          <TextInput
            type="text"
            id="card-title"
            sizing="sm"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
            }}
          />
        </div>

        <button className="p-1 rounded-md bg-orange-500 hover:bg-orange-600 text-white mt-6 ml-3">
          Create Card
        </button>
      </form>
    </div>
  );
};
