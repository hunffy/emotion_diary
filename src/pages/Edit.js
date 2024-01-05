import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  console.log("id :", id);
  const mode = searchParams.get("mode");
  console.log("mode : ", mode);
  return (
    <div className="Edit">
      <h1>Edit.js</h1>
      <button
        onClick={() => {
          setSearchParams({ who: "sehunkim" });
        }}
      >
        QS바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
