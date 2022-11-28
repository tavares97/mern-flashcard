import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardOrDeckController } from "./controllers/createCardOrDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardController } from "./controllers/deleteCardController";

const app = express();

//Allows us to use middleware, support for json requests
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);

app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardOrDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`DB CONNECTED TO PORT ${process.env.PORT!}`);
  app.listen(process.env.PORT!);
});
