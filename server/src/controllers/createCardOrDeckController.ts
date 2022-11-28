import { Request, Response } from "express";
import DeckModel from "../models/Deck";

/**
 * If a deck with the given ID exists, add the given text to the deck's cards array and save the deck.
 * @param {Request} req - Request - this is the request object that is passed to the controller
 * function. It contains information about the request, such as the body, headers, and params.
 * @param {Response} res - Response - this is the response object that we will use to send back a
 * response to the client.
 * @returns The deck with the new card added to it.
 */
export async function createCardOrDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId);
  if (!deck) return res.status(400).send("No deck with given ID exists");

  const { text } = req.body;

  deck.cards.push(text);
  await deck.save();
  res.json(deck);
}
