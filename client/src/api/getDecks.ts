import { API_URL } from "./config";

export type TDeck = {
  _id: string;
  title: string;
};

export async function getDecks(): Promise<TDeck[]> {
  const newDecks = await fetch(`${API_URL}/decks`).then((response) =>
    response.json()
  );

  return newDecks;
}
