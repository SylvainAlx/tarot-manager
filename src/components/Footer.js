import Link from "next/link";
import Nav from "./nav";

const Footer = () => {
  return (
    <footer>
      <Nav />
      <p>
        application réalisée par Sylvain Alexandre |{" "}
        <Link href="https://github.com/SylvainAlx" target="_blanc">
          https://github.com/SylvainAlx
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
