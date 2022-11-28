import { API_URL } from "./config";

export type TDeck = {
  _id: string;
  title: string;
  cards: string[];
};

/**
 * It fetches the decks from the API and returns them
 * @returns An array of decks
 */
export async function getDecks(): Promise<TDeck[]> {
  const newDecks = await fetch(`${API_URL}/decks`).then((response) =>
    response.json()
  );

  return newDecks;
}
