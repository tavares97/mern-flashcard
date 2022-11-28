import { Request, Response } from "express";
import DeckModel from "../models/Deck";

/**
 * This function gets a deck by its id
 * @param {Request} req - Request - This is the request object that contains all the information about
 * the request.
 * @param {Response} res - Response - This is the response object that we will use to send back the
 * data to the client.
 */
export async function getDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId);

  //Returns the decks
  res.json(deck);
}
