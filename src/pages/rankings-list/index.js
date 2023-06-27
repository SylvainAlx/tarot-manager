import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdList,
  MdAccountCircle,
  MdSupervisedUserCircle,
  MdOutlineDownloadDone,
  MdEditNote,
  MdModeEdit,
} from "react-icons/md";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Rankinks() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    players: 0,
    games: 0,
  });
  const { push } = useRouter();
  useEffect(() => {
    localStorage.removeItem("ranking");
    getRankings();
  }, []);
  useEffect(() => {
    getStats();
    console.log(rankings);
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
      const id = e.currentTarget.getAttribute("id");
      const password = window.prompt("mot de passe");
      const ranking = await fetch(`/api/rankings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.rankName) {
            setLoading(true);
            localStorage.setItem("ranking", JSON.stringify(data));
            push("/dashboard");
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
      if (rank.players !== undefined) {
        players += rank.players.length;
        games += rank.games.length;
        setStats({ ...stats, players, games });
      }
    });
  };
  return (
    <>
      <Header />
      <main>
        {!loading ? (
          <>
            <h2>Liste des parties</h2>
            <table>
              <thead>
                <tr>
                  {/* <th>
                <MdUpdate />
              </th> */}
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
                    // let date = new Date(ranking.updatedAt);
                    // date = date.toLocaleString();
                    return (
                      <tr key={i}>
                        {/* <td>{date}</td> */}
                        <td>{ranking.rankName}</td>
                        <td>{ranking.user}</td>
                        <td>
                          {ranking.players !== undefined
                            ? ranking.players.length
                            : 0}{" "}
                          joueur{ranking.players.length > 1 && "s"}
                        </td>
                        <td>
                          {ranking.games.length} manche
                          {ranking.games.length > 1 && "s"}
                        </td>
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
                <tbody>
                  <tr>
                    <td colSpan="6">
                      <Loader />
                    </td>
                  </tr>
                </tbody>
              )}
              <tfoot>
                <tr>
                  <th colSpan="2">TOTAL</th>
                  <td>
                    {stats.players} joueur{stats.players > 1 && "s"} classé
                    {stats.players > 1 && "s"}
                  </td>
                  <td>
                    {stats.games} manche{stats.games > 1 && "s"} jouée
                    {stats.games > 1 && "s"}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </>
        ) : (
          <Loader />
        )}
      </main>
      <Footer />
    </>
  );
}
