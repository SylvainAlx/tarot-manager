import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import { useEffect } from "react";
import { GiSandsOfTime } from "react-icons/gi";

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
        <div className="sablier">
          <GiSandsOfTime />
        </div>
        <h3>
          Application en construction, merci de patienter avant de l'utiliser
        </h3>
      </main>
      <Footer />
    </>
  );
}
