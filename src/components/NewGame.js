import { useEffect, useState } from "react";
import { MdOutlineCheck } from "react-icons/md";

const NewGame = ({ setShowNewGame, ranking, setRanking, updateRanking }) => {
  const date = new Date().valueOf();
  const [game, setGame] = useState({
    date,
    joueurs: [],
    contrat: 1,
    bouts: 56,
    points: 0,
    petitAuBout: 0,
    poignee: 0,
    chelem: 0,
  });
  // useEffect(() => {
  //   console.log(game);
  // }, [game]);

  const handleChange = (e) => {
    const joueurs = [...game.joueurs];
    if (e.target.name === "joueur") {
      let exist = false;
      joueurs.map((joueur, i) => {
        if (joueur.name === e.target.value) {
          exist = true;
          joueurs.splice(i, 1);
        }
      });
      if (!exist) {
        joueurs.push({
          name: e.target.value,
          role: "",
          points: 0,
          bonus: 0,
        });
      }
      setGame({ ...game, joueurs });
    } else if (e.target.name === "preneur") {
      joueurs.map((joueur, i) => {
        if (joueur.name === e.target.value && joueur.role !== "preneur") {
          joueurs[i].role = "preneur";
        } else if (joueur.role !== "appelé") {
          joueurs[i].role = "défenseur";
        }
      });
      setGame({ ...game, joueurs });
    } else if (e.target.name === "contrat") {
      setGame({ ...game, contrat: Number(e.target.value) });
    } else if (e.target.name === "bouts") {
      setGame({ ...game, bouts: Number(e.target.value) });
    } else if (e.target.name === "appelé") {
      joueurs.map((joueur, i) => {
        if (joueur.name === e.target.value && joueur.role !== "appelé") {
          joueurs[i].role = "appelé";
        } else if (joueur.role !== "preneur") {
          joueurs[i].role = "défenseur";
        }
      });
      setGame({ ...game, joueurs });
    } else if (e.target.name === "points") {
      setGame({ ...game, points: Number(e.target.value) });
    }
  };
  const updatePlayers = () => {
    let joueurs = [...game.joueurs];
    let defense = 0;
    let totalScore =
      (25 + game.points - game.bouts + game.petitAuBout) * game.contrat +
      game.poignee +
      game.chelem;
    joueurs.map((player, i) => {
      if (joueurs.length < 5) {
        if (player.role === "défenseur") {
          defense += 1;
          if (game.points >= game.bouts) {
            joueurs[i].points = -totalScore;
          } else {
            joueurs[i].points = totalScore;
          }
          //   -(game.points - game.bouts + 25) * game.contrat + player.bonus;
          // joueurs[i].points =
          //   -(game.points - game.bouts + 25) * game.contrat + player.bonus;
        }
        joueurs.map((player, i) => {
          if (player.role === "preneur") {
            if (game.points >= game.bouts) {
              joueurs[i].points = totalScore * defense;
            } else {
              joueurs[i].points = -totalScore * defense;
            }
            // joueurs[i].points = score * -1 + player.bonus;
          }
        });
      } else if (joueurs.length === 5) {
        if (player.role === "défenseur") {
          if (game.points >= game.bouts) {
            joueurs[i].points = -game.points;
          } else {
            joueurs[i].points = game.points;
          }
        } else {
          let defense = 0;
          joueurs.map((joueur, y) => {
            if (joueur.role === "défenseur") {
              defense += 1;
            }
          });
          if (game.points >= game.bouts) {
            if (player.role === "preneur") {
              joueurs[i].points = (game.points * defense * 2) / 3;
            } else if (player.role === "appelé") {
              joueurs[i].points = (game.points * defense * 1) / 3;
            }
          } else {
            if (player.role === "preneur") {
              joueurs[i].points = (-game.points * defense * 2) / 3;
            } else if (player.role === "appelé") {
              joueurs[i].points = (-game.points * defense * 1) / 3;
            }
          }
        }
      }
    });

    setGame({ ...game, joueurs });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlayers();
    let exist = false;
    ranking.games.map((e, i) => {
      if (e.date === game.date) {
        exist = true;
        const update = { ...ranking };
        update.games[i] = game;

        updateRanking(update);
      }
    });
    if (exist == false) {
      const update = { ...ranking };
      update.games.push(game);
      updateRanking(update);
      setRanking(update);
    }
    setShowNewGame(false);
  };
  return (
    <>
      <div
        className="newGameBackground"
        onClick={() => setShowNewGame(false)}
      ></div>
      <form className="newGame">
        <div className="choice">
          <h4>Joueurs</h4>
          {ranking.players !== undefined &&
            ranking.players.map((player, i) => {
              return (
                <div key={i}>
                  <label>
                    <input
                      type="checkbox"
                      name="joueur"
                      value={player.name}
                      onChange={handleChange}
                    />
                    {player.name}
                  </label>
                </div>
              );
            })}
        </div>
        <div className="choice">
          <h4>Preneur</h4>
          {game.joueurs !== undefined &&
            game.joueurs.map((player, i) => {
              return (
                <div key={i}>
                  <label>
                    <input
                      type="radio"
                      name="preneur"
                      value={player.name}
                      checked={player.role === "preneur"}
                      onChange={handleChange}
                    />
                    {player.name}
                  </label>
                </div>
              );
            })}
        </div>
        <div className="choice">
          <h4>Contrat</h4>
          <div>
            <label>
              <input
                type="radio"
                name="contrat"
                value="1"
                checked={game.contrat === 1}
                onChange={handleChange}
              />
              Prise
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="contrat"
                value="2"
                checked={game.contrat === 2}
                onChange={handleChange}
              />
              Garde
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="contrat"
                value="4"
                checked={game.contrat === 4}
                onChange={handleChange}
              />
              Garde-sans
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="contrat"
                value="6"
                checked={game.contrat === 6}
                onChange={handleChange}
              />
              Garde-contre
            </label>
          </div>
        </div>
        <div className="choice">
          <h4>Bouts</h4>
          <div>
            <label>
              <input
                type="radio"
                name="bouts"
                value="56"
                checked={game.bouts === 56}
                onChange={handleChange}
              />
              Zéro
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="bouts"
                value="51"
                checked={game.bouts === 51}
                onChange={handleChange}
              />
              Un
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="bouts"
                value="41"
                checked={game.bouts === 41}
                onChange={handleChange}
              />
              Deux
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="bouts"
                value="36"
                checked={game.bouts === 36}
                onChange={handleChange}
              />
              Trois
            </label>
          </div>
        </div>
        {game.joueurs.length > 4 && (
          <div className="choice">
            <h4>Joueur appelé</h4>
            {game.joueurs !== undefined &&
              game.joueurs.map((player, i) => {
                if (player.role !== "preneur") {
                  return (
                    <div key={i}>
                      <label>
                        <input
                          type="radio"
                          name="appelé"
                          value={player.name}
                          checked={player.role === "appelé"}
                          onChange={handleChange}
                          required
                        />
                        {player.name}
                      </label>
                    </div>
                  );
                }
              })}
          </div>
        )}
        <div className="choice">
          <h4>Points</h4>
          <div className="points">
            <h5>Attaque : {game.points}</h5>
            <h5>Défense : {91 - game.points}</h5>
          </div>
          <input
            type="range"
            name="points"
            value={game.points}
            onChange={handleChange}
            max="91"
          />
        </div>
        <button onClick={handleSubmit} className="button">
          <MdOutlineCheck />
        </button>
      </form>
    </>
  );
};

export default NewGame;
