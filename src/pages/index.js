import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.removeItem("ranking");
  }, []);

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
      <Header />
      <main>
        <h2>Bienvenue</h2>
        <ul>
          <li>
            Tarot Manager permet de tenir des{" "}
            <b>classements de parties de tarot</b> en gérant les points, les
            joueurs et les manches
          </li>
          <li>
            Tarot Manager permet également le{" "}
            <b>calcul automatique des points</b>
            répartis, gagnant ainsi du temps pour les joueurs en cours de partie
          </li>
          <li>
            Tarot Manager inclus aussi un{" "}
            <b>classement général de l'ensemble des joueurs</b> l'utilisant
          </li>
        </ul>
        <h3>
          Créez une nouvelle partie ou gérez celle(s) que vous avez créée(s):
        </h3>
        <div className="buttonContainer">
          <div className="button">
            <Link href="/new-ranking">créer votre parite</Link>
          </div>
          <div className="button">
            <Link href="/rankings-list">gérer votre partie</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
