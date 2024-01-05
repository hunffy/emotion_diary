import React, { useState } from "react";

const sortOptionList = [
  { value: "lastest", name: "최신순" },
  { value: "oldest", name: "오래된  순" },
];
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((e, index) => (
        <option key={index}>{e.name}</option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("lastest");

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {diaryList.map((e) => (
        <div key={e.id}>
          <p>{e.content}</p>
          <p>{e.date}</p>
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
