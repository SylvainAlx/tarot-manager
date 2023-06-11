import { Schema, model, models, mongoose } from "mongoose";

const rankingSchema = new Schema(
  {
    rankName: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    players: [
      {
        name: String,
        points: Number,
        victories: Number,
        defeats: Number,
      },
    ],
    games: [
      {
        hold: String,
        winners: {
          players: Array,
          points: Number,
        },
        losers: {
          players: Array,
          points: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Ranking = models.Ranking || model("Ranking", rankingSchema);

export default Ranking;
