import { useEffect, useState } from "react";
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
          <GiSpades />
        </div>
        <b>CHARGEMENT</b>
      </div>
    );
  }
  return <p>aucune information</p>;
};
export default Loader;
