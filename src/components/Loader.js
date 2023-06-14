import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiSpades } from "react-icons/gi";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  if (loading) {
    return (
      <div className="loader">
        <div className="spinner">
          {/* <AiOutlineLoading3Quarters /> */}
          <GiSpades />
        </div>
        <b>CHARGEMENT</b>
      </div>
    );
  }
  return <p>pas de données</p>;
};
export default Loader;
