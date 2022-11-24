import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from "./models/Deck";

const app = express();

//Allows us to use middleware, support for json requests
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  //Gets decks from MongDB
  const decks = await Deck.find();
  //Returns the decks
  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  //Gets data from body and creates new instance of Deck
  const newDeck = new Deck({
    title: req.body.title,
  });

  //Saves new deck to MongoDB and returns
  const created = await newDeck.save();
  res.json(created);
});

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
  //Gets deck id from URL
  const deckId = req.params.deckId;
  //Finds id and deletes
  await Deck.findByIdAndDelete(deckId);
  res.json({
    message: "Deck successfully deleted",
  });
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`DB CONNECTED TO PORT ${process.env.PORT!}`);
  app.listen(process.env.PORT!);
});
