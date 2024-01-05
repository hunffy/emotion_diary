import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const goNew = () => {
    navigate("/new");
  };
  return (
    <div className="Home">
      <h1>home.js</h1>
      <button onClick={goNew}>go new</button>
    </div>
  );
};

export default Home;
