import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <Link href="/">Accueil</Link>
      <Link href="/new-ranking">Créer un classement</Link>
    </nav>
  );
};

export default Nav;
