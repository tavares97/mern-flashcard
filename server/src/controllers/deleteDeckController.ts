import { Request, Response } from "express";
import DeckModel from "../models/Deck";

/**
 * It finds the deck by id and deletes it
 * @param {Request} req - Request - This is the request object that contains all the information about
 * the request.
 * @param {Response} res - Response - This is the response object that we will use to send back a
 * response to the client.
 */
export async function deleteDeckController(req: Request, res: Response) {
  //Gets deck id from URL
  const deckId = req.params.deckId;
  //Finds id and deletes
  await DeckModel.findByIdAndDelete(deckId);
  res.json({
    message: "Deck successfully deleted",
  });
}
