import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCheck } from "react-icons/md";

const NewRanking = () => {
  const [newRank, setNewRank] = useState({
    rankName: "",
    user: "",
    password: "",
    players: [],
    games: [],
  });
  const { push } = useRouter();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewRank({ ...newRank, [name]: value });
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
          console.log(data);
          alert("classement créé avec succès");
          push("/rankings-list");
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
          <button className="button">
            <MdOutlineCheck />
          </button>
        </form>
      </section>
    </main>
  );
};

export default NewRanking;
