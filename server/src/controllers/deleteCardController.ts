import { Request, Response } from "express";
import DeckModel from "../models/Deck";

/**
 * It deletes a card from a deck
 * @param {Request} req - Request - This is the request object that is passed to the controller. It
 * contains information about the request, such as the URL, the body, the headers, etc.
 * @param {Response} res - Response - This is the response object that we will use to send back a
 * response to the client.
 * @returns The deck with the card removed
 */
export async function deleteCardController(req: Request, res: Response) {
  //Gets deck id from URL
  const deckId = req.params.deckId;
  const index = req.params.index;

  const deck = await DeckModel.findById(deckId);
  if (!deck) return res.status(400).send("No deck with given ID exists");

  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
}
