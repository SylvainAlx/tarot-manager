import { useEffect, useState } from "react";

const Dashboard = () => {
  const [ranking, setRanking] = useState({});
  useEffect(() => {
    setRanking(JSON.parse(localStorage.getItem("ranking")));
  }, []);
  useEffect(() => {
    console.log(ranking);
  }, [ranking]);
  // const editPlayers = (e) => {
  //   const rankCopy = { ...newRank };
  //   rankCopy.players[e.target.id].name = e.target.value;
  //   setNewRank(rankCopy);
  // };
  const addPlayer = async (e) => {
    try {
      const name = window.prompt("nom du joueur");
      e.preventDefault();
      const rankCopy = { ...ranking };
      rankCopy.players.push({
        name,
        points: 0,
        games: 0,
        victories: 0,
        defeats: 0,
      });
      const createdRanking = await fetch("/api/rankings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rankCopy),
      })
        .then((res) => res.json())
        .then((data) => {
          setRanking(data);
        })
        .catch((error) => alert(error));
    } catch (error) {
      console.log(error);
    }
  };
  // const deletePlayer = (e) => {
  //   e.preventDefault();
  //   const rankCopy = { ...newRank };
  //   rankCopy.players.splice(e.target.name, 1);
  //   setNewRank(rankCopy);
  // };
  return (
    <main>
      <h2>Tableau de bord</h2>
      <h3>Classement : {ranking.rankName}</h3>
      <h4>Administrateur : {ranking.user}</h4>
      <table>
        <thead>
          <tr>
            <th colSpan="4">Joueurs</th>
          </tr>
        </thead>
        <tbody>
          {ranking.players !== undefined &&
            ranking.players.map((player, i) => {
              return (
                <tr key={i}>
                  <td>{player.name}</td>
                  <td>{player.points} point(s)</td>
                  <td>{player.victories} victoire(s)</td>
                  <td>{player.defeats} défaites(s)</td>
                </tr>
              );
            })}
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
        <tbody></tbody>
        <tfoot></tfoot>
      </table>
    </main>
  );
};

export default Dashboard;
