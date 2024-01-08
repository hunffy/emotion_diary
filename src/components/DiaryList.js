import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

//최신순,오래된순
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된  순" },
];

const filterOptionList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

//최신,오래된순 컴포넌트
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((e, index) => (
        <option key={index} value={e.value}>
          {e.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  //최신,오래된순 상태
  const [sortType, setSortType] = useState("latest");

  //감정 상태
  const [filter, setFilter] = useState("all");

  //최신순,오래된순 정렬기능 함수
  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((e) => filterCallBack(e));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  const navigate = useNavigate();

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            text={"새 일기쓰기"}
            type={"positive"}
            onClick={() => {
              navigate("/new");
            }}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((e) => (
        <DiaryItem key={e.id} {...e} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
