import connectMongo from "../../../utils/dbConfig.js";
import Ranking from "@/models/rankingSchema";
import bcrypt from "bcrypt";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

const rankingAPI = async (req, res) => {
  try {
    await connectMongo();
    if (req.method === "POST" && req.body.rankName) {
      try {
        // const createdRanking = await Ranking.create(req.body);
        let { rankName, user, password, players, games } = req.body;
        const salt = await bcrypt.genSalt(10);
        const cryptedPass = await bcrypt.hash(password, salt);
        password = cryptedPass;
        const ranking = await Ranking.create({
          rankName,
          user,
          password,
          players,
          games,
        });
        res.status(200).json(ranking);
      } catch (error) {
        res.status(400).json(error);
      }
    } else if (req.method === "POST" && typeof req.body.id) {
      try {
        const ranking = await Ranking.findOne({ _id: req.body.id });
        const compare = () => {
          bcrypt.compare(
            req.body.password,
            ranking.password,
            function (err, result) {
              if (err) {
                console.error(err);
                return;
              }
              if (result) {
                res.status(200).json(ranking);
              } else {
                res.status(400).json({ message: "mot de passe invalide" });
              }
            }
          );
        };
        compare();
      } catch (err) {
        res.status(400).json({ message: "mot de passe invalide" });
      }
    } else if (req.method === "PUT") {
      try {
        if (req.body.delete === true) {
          try {
            const deletedElement = await Ranking.findByIdAndDelete(
              req.body._id
            );
            console.log("Élément supprimé :", deletedElement);
          } catch (error) {
            console.error(
              "Erreur lors de la suppression de l'élément :",
              error
            );
          }
        } else {
          const { _id, players, games } = req.body;
          console.log(players);
          let ranking = await Ranking.findOne({ _id });
          ranking.players = players;
          ranking.games = games;
          ranking.save().then((resp) => res.status(200).json(ranking));
        }
      } catch (err) {
        res.status(400).json(err);
      }
    } else if (req.method === "GET") {
      const getRankings = await Ranking.find();
      res.status(200).json(getRankings);
    } else {
      throw new Error(`Unsupported HTTP method: ${req.method}`);
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

export default rankingAPI;
