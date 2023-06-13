import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
        <AiOutlineLoading3Quarters />
      </div>
    );
  }
  return <p>pas de données</p>;
};
export default Loader;
