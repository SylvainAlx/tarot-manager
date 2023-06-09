import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [rankings, setRankings] = useState([]);
  const [myRank, setMyRank] = useState({});
  useEffect(() => {
    getRankings();
  }, []);
  useEffect(() => {
    console.log(myRank);
  }, [myRank]);
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
        {rankings.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th>dernière utilisation</th>
                <th>classement</th>
                <th>gérant</th>
                <th>nombre de joueurs</th>
                <th>parties jouées</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((ranking, i) => {
                let date = new Date(ranking.updatedAt);
                date = date.toLocaleString();
                return (
                  <tr key={i}>
                    <td>{date}</td>
                    <td>{ranking.rankName}</td>
                    <td>{ranking.user}</td>
                    <td>{ranking.players.length}</td>
                    <td>{ranking.games}</td>
                    <td>
                      <button id={ranking._id} onClick={handleClick}>
                        VOIR
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
