import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import NewGame from "@/components/NewGame";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [ranking, setRanking] = useState({});
  const [showNewGame, setShowNewGame] = useState(false);
  const [sortedPoints, setSortedPoints] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    setRanking(JSON.parse(localStorage.getItem("ranking")));
  }, []);
  useEffect(() => {
    console.log(ranking);
  }, [ranking]);

  const comparer = (prop) => {
    return (a, b) => {
      if (sortedPoints === false) {
        if (a[prop] > b[prop]) {
          return -1;
        }
        if (a[prop] < b[prop]) {
          return 1;
        }
        return 0;
      } else {
        if (a[prop] < b[prop]) {
          return -1;
        }
        if (a[prop] > b[prop]) {
          return 1;
        }
        return 0;
      }
    };
  };
  const trierTableau = (prop) => {
    const nouveauTableau = [...ranking.players].sort(comparer(prop));
    setRanking({ ...ranking, players: nouveauTableau });
    setSortedPoints(!sortedPoints);
  };
  const updateRanking = async (rank) => {
    const scores = [...rank.players];
    scores.forEach((player, i) => {
      player.totalPoints = 0;
      player.totalGames = 0;
    });
    rank.games.forEach((game, i) => {
      game.joueurs.forEach((joueur, j) => {
        scores.forEach((player, y) => {
          if (joueur.name === player.name) {
            player.totalPoints += joueur.points;
            player.totalGames += 1;
          }
        });
      });
    });
    rank.players = scores;
    const update = await fetch("/api/rankings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rank),
    })
      .then((res) => res.json())
      .then((data) => {
        setRanking(data);
        localStorage.setItem("ranking", JSON.stringify(rank));
      })
      .catch((error) => console.log(error));
  };
  const addPlayer = async (e) => {
    e.preventDefault();
    const name = window.prompt("nom du joueur");
    const players = [...ranking.players];
    players.push({
      name,
      totalPoints: 0,
      totalGames: 0,
    });
    const updatedRanking = { ...ranking, players };
    updateRanking(updatedRanking);
  };
  const deletePlayer = async (e) => {
    e.preventDefault();
    const name = e.currentTarget.getAttribute("name");
    const index = e.currentTarget.getAttribute("id");
    if (window.confirm(`supprimer le joueur ${name} ?`)) {
      const updatedRanking = { ...ranking };
      updatedRanking.players.splice(index, 1);
      updateRanking(updatedRanking);
    }
  };
  const addGame = async (e) => {
    if (ranking.players.length > 2) {
      console.log("ok pour création d'une nouvelle partie");
      setShowNewGame(true);
    } else {
      alert("au moins trois joueurs doivent être présents dans le classement");
    }
  };
  const deleteGame = async (e) => {
    e.preventDefault();
    const index = e.currentTarget.getAttribute("id");
    if (window.confirm(`supprimer la manche n°${Number(index) + 1} ?`)) {
      const updatedRanking = { ...ranking };
      updatedRanking.games.splice(index, 1);
      updateRanking(updatedRanking);
    }
  };
  const deleteRanking = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        `Supprimer la partie ${ranking.rankName} ? Cette action est irréversible.`
      )
    ) {
      updateRanking({ ...ranking, delete: true });
      window.alert("partie supprimée");
      push("/rankings-list");
    }
  };
  return (
    <>
      <Header />
      <main>
        <h2>
          Partie <b>{ranking.rankName}</b> créée par <b>{ranking.user}</b>
        </h2>
        <div className="buttonContainer">
          <div onClick={deleteRanking} className="button">
            Supprimer la partie
          </div>
          <div onClick={addPlayer} className="button">
            Ajouter un joueur
          </div>
          <div onClick={addGame} className="button">
            Ajouter une manche
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th colSpan="4">Joueurs</th>
            </tr>
            <tr>
              <th colSpan="4" onClick={() => trierTableau("totalPoints")}>
                <div className="icon2">
                  <RiArrowUpDownFill />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ranking.players !== undefined && ranking.players.length > 0 ? (
              ranking.players.map((player, i) => {
                return (
                  <tr key={i}>
                    <td>{player.name}</td>
                    <td>
                      {player.totalPoints} point
                      {player.totalPoints !== 0 &&
                        player.totalPoints !== 1 &&
                        "s"}
                    </td>
                    <td>
                      {player.totalGames} manche
                      {player.totalGames !== 0 &&
                        player.totalGames !== 1 &&
                        "s"}
                    </td>
                    <td onClick={deletePlayer} name={player.name} id={i}>
                      <MdDelete />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
        <table>
          <thead>
            <tr>
              <th colSpan="7">Manches</th>
            </tr>
            <tr>
              <th>n°</th>
              <th>date</th>
              <th>joueurs</th>
              <th>preneur</th>
              <th>contrat</th>
              <th>réussite</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ranking.games !== undefined && ranking.games.length > 0 ? (
              ranking.games.map((game, i) => {
                let preneur;
                const joueurs = [];
                const date = new Date(game.date);
                game.joueurs.map((joueur, j) => {
                  if (joueur.role === "preneur") {
                    preneur = joueur.name;
                  }
                  joueurs.push(joueur.name);
                });
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{date.toLocaleDateString()}</td>
                    <td>{joueurs.join(" ")}</td>
                    <td>{preneur}</td>
                    <td>
                      {game.contrat === 1
                        ? "Prise"
                        : game.contrat === 2
                        ? "Garde"
                        : game.contrat === 4
                        ? "Garde-sans"
                        : game.contrat === 6 && "Garde-contre"}
                    </td>
                    <td>{game.points >= game.bouts ? "Oui" : "Non"}</td>
                    <td onClick={deleteGame} id={i}>
                      <MdDelete />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7">
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
        {showNewGame && (
          <NewGame
            showNewGame={showNewGame}
            setShowNewGame={setShowNewGame}
            ranking={ranking}
            setRanking={setRanking}
            updateRanking={updateRanking}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
