import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  return (
    <div className="Diary">
      <h1>Diary.js</h1>
      <h3>{id}번째 일기</h3>
    </div>
  );
};

export default Diary;
