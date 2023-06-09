import { useState } from "react";
import { useRouter } from "next/navigation";

const NewRanking = () => {
  const [newRank, setNewRank] = useState({
    rankName: "",
    user: "",
    password: "",
    players: [
      { name: "", points: 0, games: 0 },
      { name: "", points: 0, games: 0 },
      { name: "", points: 0, games: 0 },
    ],
    games: 0,
  });
  const { push } = useRouter();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewRank({ ...newRank, [name]: value });
  };

  const editPlayers = (e) => {
    const rankCopy = { ...newRank };
    rankCopy.players[e.target.id].name = e.target.value;
    setNewRank(rankCopy);
  };
  const addPlayer = (e) => {
    e.preventDefault();
    const rankCopy = { ...newRank };
    rankCopy.players.push({ name: "", points: 0, games: 0 });
    setNewRank(rankCopy);
  };
  const deletePlayer = (e) => {
    e.preventDefault();
    const rankCopy = { ...newRank };
    rankCopy.players.splice(e.target.name, 1);
    setNewRank(rankCopy);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdRanking = await fetch("/api/rankings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRank),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            alert("classement créé avec succès");
            push("/");
          } else {
            console.log(data.error.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <section>
        <h2>Créer un nouveau classement</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="name"
            name="rankName"
            value={newRank.rankName}
            required
            placeholder="nom du classement"
          />
          <input
            onChange={handleChange}
            type="name"
            name="user"
            value={newRank.user}
            required
            placeholder="nom du gérant"
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={newRank.password}
            required
            placeholder="mot de passe"
          />
          {newRank.players.map((player, i) => {
            return (
              <div key={i}>
                <input
                  onChange={editPlayers}
                  id={i}
                  type="text"
                  value={player.name}
                  placeholder={`nom joueur ${i + 1}`}
                />
                <button name={i} onClick={deletePlayer}>
                  X
                </button>
              </div>
            );
          })}
          <button onClick={addPlayer}>ajouter un joueur</button>
          <input type="submit" value="créer le classement" />
        </form>
      </section>
    </main>
  );
};

export default NewRanking;
