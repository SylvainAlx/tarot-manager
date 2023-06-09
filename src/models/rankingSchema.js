import { Schema, model, models } from "mongoose";

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
    players: {
      type: Array,
      required: true,
    },
    games: Number,
  },
  {
    timestamps: true,
  }
);

const Ranking = models.Ranking || model("Ranking", rankingSchema);

//methode pour vérifier que le mot de passe envoyé correspond à celui de la BDD
rankingSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default Ranking;
