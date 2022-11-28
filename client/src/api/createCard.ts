import { API_URL } from "./config";
import { TDeck } from "./getDecks";

/**
 * It takes a deckId and a text string, and returns a promise that resolves to a deck object
 * @param {string} deckId - The id of the deck you want to add a card to.
 * @param {string} text - The text of the card.
 * @returns A promise that resolves to a TDeck object
 */
export async function createCard(deckId: string, text: string): Promise<TDeck> {
  const card = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  }).then((res) => res.json());

  return card;
}
