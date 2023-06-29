import Link from "next/link";
import Nav from "./nav";

const Footer = () => {
  return (
    <footer>
      <Nav />
      <Link href="https://github.com/SylvainAlx" target="_blanc">
        SylvainAlx - 2023
      </Link>
    </footer>
  );
};

export default Footer;
