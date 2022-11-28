import { API_URL } from "./config";

/**
 * It makes a DELETE request to the API endpoint for deleting a card from a deck
 * @param {string} deckId - The id of the deck you want to delete a card from.
 * @param {number} index - The index of the card in the deck.
 * @returns The response from the server.
 */
export async function deleteCard(deckId: string, index: number) {
  const res = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
    method: "DELETE",
  });

  return res.json();
}
