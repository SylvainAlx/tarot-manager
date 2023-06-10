import Link from "next/link";
import { MdHome, MdAddCircleOutline } from "react-icons/md";

const Nav = () => {
  return (
    <nav>
      <Link className="navLink" href="/">
        <MdHome className="icon" />
        ACCUEIL
      </Link>
      <Link className="navLink" href="/new-ranking">
        <MdAddCircleOutline className="icon" />
        CRÉER UN CLASSEMENT
      </Link>
    </nav>
  );
};

export default Nav;
