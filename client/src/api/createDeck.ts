import { API_URL } from "./config";

/**
 * It makes a POST request to the /decks endpoint with the title of the deck as the body of the request
 * @param {string} title - string
 * @returns A promise that resolves to a deck object
 */
export async function createDeck(title: string) {
  const deck = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());

  return deck;
}
