import React, { useContext, useEffect, useState } from "react";
import Myheader from "../components/Myheader.js";
import MyButton from "../components/MyButton.js";
import { DiaryStateContext } from "../App.js";
import DiaryList from "../components/DiaryList.js";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  //diaryList에서 가져온 데이터를 "월"에 따라 출력되는게 다르게하기위해 가공하기
  const [data, setData] = useState([]);

  //날짜 상태관리
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      //해당 년월에 시작일과 해당 년월에 마지막일에 포함된 요소만 저장.
      setData(diaryList.filter((e) => firstDay <= e.date && e.date <= lastDay));
    }
  }, [diaryList, curDate]);

  return (
    <div className="Home">
      <Myheader
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        headText={headText}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
