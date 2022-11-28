import { API_URL } from "./config";

/**
 * It fetches a deck from the API and returns the deck
 * @param {string} deckId - The id of the deck you want to get.
 * @returns A promise that resolves to an object with a single deck.
 */
export async function getDeck(deckId: string) {
  const newDecks = await fetch(`${API_URL}/decks/${deckId}`).then((response) =>
    response.json()
  );

  return newDecks;
}
