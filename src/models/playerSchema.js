import { Schema, model, models, mongoose } from "mongoose";

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    data: [
      {
        ranking: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ranking",
        },
        games: Number,
        points: Number,
        initiatives: Number,
        victories: Number,
        defeats: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Player = models.Player || model("Player", playerSchema);

export default Player;
