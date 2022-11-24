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
  const decks = await Deck.find();

  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });

  const created = await newDeck.save();

  res.json(created);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`DB CONNECTED TO PORT ${process.env.PORT!}`);
  app.listen(process.env.PORT!);
});
