import { Request, Response } from "express";
import DeckModel from "../models/Deck";

/**
 * It gets decks from MongoDB and returns them
 * @param {Request} req - Request - This is the request object that is passed to the controller. It
 * contains information about the request, such as the body, headers, and query parameters.
 * @param {Response} res - Response - This is the response object that will be sent back to the client.
 */
export async function getDecksController(req: Request, res: Response) {
  //Gets decks from MongDB
  const decks = await DeckModel.find();
  //Returns the decks
  res.json(decks);
}
