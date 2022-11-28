import { Request, Response } from "express";
import DeckModel from "../models/Deck";
/**
 * It creates a new deck and saves it to the database
 * @param {Request} req - Request - This is the request object that is passed in from the route.
 * @param {Response} res - Response - This is the response object that we will use to send back a
 * response to the client.
 */
export async function createDeckController(req: Request, res: Response) {
  //Gets data from body and creates new instance of Deck
  const newDeck = new DeckModel({
    title: req.body.title,
  });

  //Saves new deck to MongoDB and returns
  const created = await newDeck.save();
  res.json(created);
}
