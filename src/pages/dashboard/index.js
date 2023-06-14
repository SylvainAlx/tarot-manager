import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import NewGame from "@/components/NewGame";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const Dashboard = () => {
  const [ranking, setRanking] = useState({});
  const [showNewGame, setShowNewGame] = useState(false);
  const [game, setGame] = useState({});

  useEffect(() => {
    setRanking(JSON.parse(localStorage.getItem("ranking")));
  }, []);

  useEffect(() => {
    console.log(ranking);
  }, [ranking]);

  const updateRanking = async (rank) => {
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
    const newPlayer = {
      name,
      points: 0,
      games: 0,
      victories: 0,
      defeats: 0,
    };
    const players = [...ranking.players];
    players.push(newPlayer);
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
  return (
    <>
      <Header />
      <main>
        <h2>
          Tableau des scores <em>{ranking.rankName}</em>
        </h2>
        <h3>Administrateur : {ranking.user}</h3>
        <table>
          <thead>
            <tr>
              <th colSpan="5">Joueurs</th>
            </tr>
          </thead>
          <tbody>
            {ranking.players !== undefined && ranking.players.length > 0 ? (
              ranking.players.map((player, i) => {
                return (
                  <tr key={i}>
                    <td>{player.name}</td>
                    <td>
                      {player.points} point{player.points > 1 && "s"}
                    </td>
                    <td>
                      {player.victories} victoire{player.victories > 1 && "s"}
                    </td>
                    <td>
                      {player.defeats} défaites{player.defeats > 1 && "s"}
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
        <div onClick={addPlayer} className="button">
          Ajouter un joueur
        </div>
        <table>
          <thead>
            <tr>
              <th>Parties</th>
            </tr>
          </thead>
          <tbody>
            {ranking.games !== undefined && ranking.games.length > 0 ? (
              ranking.games.map((game, i) => {
                return (
                  <tr key={i}>
                    <td>{game.name}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td onClick={""} name={""} id={i}>
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
        <div onClick={addGame} className="button">
          Ajouter une partie
        </div>
        <NewGame
          showNewGame={showNewGame}
          setShowNewGame={setShowNewGame}
          ranking={ranking}
        />
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
