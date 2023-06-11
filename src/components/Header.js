import Nav from "@/components/nav";
import Image from "next/image";
import tarot from "../../public/images/tarot.webp";

const Header = () => {
  return (
    <header>
      <Image src={tarot} width={150} alt="Jeu de tarot" />
      <h1>TAROT MANAGER</h1>
      <Nav />
    </header>
  );
};

export default Header;
