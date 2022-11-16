import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

const app = express();

//Allows us to use middleware, support for json requests
app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });

  const created = await newDeck.save();

  res.json(created);
});

mongoose
  .connect(
    "mongodb+srv://vacie:PQymIIJvhisATJBB@mern-db.448plpf.mongodb.net/test"
  )
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(5000);
  });

//PQymIIJvhisATJBB
