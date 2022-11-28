import { API_URL } from "./config";

/**
 * It sends a DELETE request to the server to delete the deck with the given id
 * @param {string} deckId - The id of the deck you want to delete.
 */
export async function deleteDeck(deckId: string) {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
  });
}
