import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import { RiArrowUpDownFill } from "react-icons/ri";

const PlayersRanking = () => {
  const [rankings, setRankings] = useState([]);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    localStorage.removeItem("ranking");
    getRankings();
  }, []);
  useEffect(() => {
    // console.log(rankings);
    trierTableau("totalPoints");
  }, [rankings]);
  useEffect(() => {
    console.log(players);
  }, [players]);
  const getRankings = async () => {
    try {
      const rankings = await fetch("/api/rankings", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setRankings(data);
          } else {
            console.log(data.error.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const trierTableau = (prop) => {
    let totalPlayers = [];
    rankings.forEach((rank, i) => {
      rank.players.forEach((player, j) => {
        totalPlayers.push(player);
      });
    });
    const nouveauTableau = totalPlayers.sort(comparer(prop));
    setPlayers(nouveauTableau);
  };
  const comparer = (prop) => {
    return (a, b) => {
      if (a[prop] > b[prop]) {
        return -1;
      }
      if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    };
  };
  return (
    <>
      <Header />
      <main>
        <h2>Classement général</h2>
        <table className="globalRanking">
          <thead>
            <tr>
              <th>Position</th>
              <th>Joueurs</th>
              <th>Points</th>
              <th>Manches</th>
            </tr>
          </thead>
          {rankings.length !== 0 ? (
            <tbody>
              {players.map((player, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{player.name}</td>
                    <td>{player.totalPoints}</td>
                    <td>{player.totalGames}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="6">
                  <Loader />
                </td>
              </tr>
            </tbody>
          )}
          <tfoot></tfoot>
        </table>
      </main>
      <Footer />
    </>
  );
};

export default PlayersRanking;
