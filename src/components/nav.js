import Link from "next/link";
import { MdList, MdHome, MdAddCircleOutline } from "react-icons/md";
import { GiPodium, GiRuleBook } from "react-icons/gi";

const Nav = () => {
  return (
    <nav>
      <Link className="navLink" href="/">
        <MdHome className="icon" />
        ACCUEIL
      </Link>
      <Link className="navLink" href="/new-ranking">
        <MdAddCircleOutline className="icon" />
        CRÉER UNE PARTIE
      </Link>
      <Link className="navLink" href="/rankings-list">
        <MdList className="icon" />
        PARTIES
      </Link>
      <Link className="navLink" href="/players-ranking">
        <GiPodium className="icon" />
        CLASSEMENT GÉNÉRAL
      </Link>
      <Link
        className="navLink"
        href="https://www.le-tarot.fr/regles-rapides-recapitulatif/"
        target="_blank"
      >
        <GiRuleBook className="icon" />
        RÈGLES DU JEU
      </Link>
    </nav>
  );
};

export default Nav;
