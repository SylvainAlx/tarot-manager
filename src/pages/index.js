import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import {
  MdUpdate,
  MdList,
  MdAccountCircle,
  MdSupervisedUserCircle,
  MdOutlineDownloadDone,
  MdEditNote,
  MdModeEdit,
} from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [rankings, setRankings] = useState([]);
  const [myRank, setMyRank] = useState({});
  const [stats, setStats] = useState({
    players: 0,
    games: 0,
  });
  useEffect(() => {
    getRankings();
  }, []);
  useEffect(() => {
    console.log(myRank);
  }, [myRank]);
  useEffect(() => {
    getStats();
  }, [rankings]);
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
  const handleClick = async (e) => {
    try {
      const password = window.prompt("mot de passe");
      const ranking = await fetch(`/api/rankings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: e.target.id, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.rankName) {
            setMyRank(data);
          } else {
            alert(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getStats = () => {
    let players = 0;
    let games = 0;
    rankings.forEach((rank, i) => {
      players += rank.players.length;
      games += rank.games;
      setStats({ ...stats, players, games });
    });
    console.log(players);
  };
  return (
    <>
      <Head>
        <title>Tarot Manager</title>
        <meta
          name="description"
          content="Gestionnaire de classement pour le tarot"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>Liste des classements</h2>

        <table>
          <thead>
            <tr>
              <th>
                <MdUpdate />
              </th>
              <th>
                <MdList />
              </th>
              <th>
                <MdAccountCircle />
              </th>
              <th>
                <MdSupervisedUserCircle />
              </th>
              <th>
                <MdOutlineDownloadDone />
              </th>
              <th>
                <MdEditNote />
              </th>
            </tr>
          </thead>
          {rankings.length !== 0 ? (
            <tbody>
              {rankings.map((ranking, i) => {
                let date = new Date(ranking.updatedAt);
                date = date.toLocaleString();
                return (
                  <tr key={i}>
                    <td>{date}</td>
                    <td>{ranking.rankName}</td>
                    <td>{ranking.user}</td>
                    <td>{ranking.players.length} joueur(s)</td>
                    <td>{ranking.games} partie(s)</td>
                    <td>
                      <MdModeEdit
                        className="button"
                        id={ranking._id}
                        onClick={handleClick}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tr>
              <td colSpan="6">Aucun classement créé</td>
            </tr>
          )}
          <tfoot>
            <tr>
              <th colSpan="3">TOTAL</th>
              <td>{stats.players} joueur(s) classé(s)</td>
              <td>{stats.games} partie(s) jouée(s)</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </main>
    </>
  );
}
