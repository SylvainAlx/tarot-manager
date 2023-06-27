import Link from "next/link";
import { MdList, MdHome, MdAddCircleOutline } from "react-icons/md";
import { GiPodium } from "react-icons/gi";

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
    </nav>
  );
};

export default Nav;
