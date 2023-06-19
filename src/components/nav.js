import Link from "next/link";
import { MdList, MdHome, MdAddCircleOutline } from "react-icons/md";

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
    </nav>
  );
};

export default Nav;
