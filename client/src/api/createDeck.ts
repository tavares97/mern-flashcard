import { API_URL } from "./config";

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
