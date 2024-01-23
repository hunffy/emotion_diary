import React, { useEffect, useState } from "react";

import List from "../components/list.js";
import SpeechToText from "../functions/speechtotext.js";
import Myheader from "../components/Myheader.js";
import MyButton from "../components/MyButton.js";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const [micOn, setMicOn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  //추가
  const handleAddClick = () => {
    const newList = [...list, { text: inputValue, checked: false }];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    setInputValue("");
  };

  //삭제
  const handleDeleteClick = (item) => {
    const newList = list.filter((i) => i !== item);
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };

  //todo list클릭시 스타일변화
  const handleCheckClick = (item) => {
    const newList = list.map((i) =>
      i === item ? { ...i, checked: !i.checked } : i
    );
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };

  //음성인식 textResult: 음성인식 결과값 , listening : 음성인식 중, 끝 상태 toggleListening : 음성인식버튼 토글
  const { textResult, listening, toggleListening } = SpeechToText();

  useEffect(() => {
    setInputValue(textResult);
  }, [textResult]);

  //로컬스토리지

  //앱이 마운트 될 때 실행
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("list")) || [];
    console.log("앱이 마운트 될 때 실행 :", list);
    setList(savedList);
  }, []);

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <div className="todolist">
      <Myheader
        headText={"Todo-List"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <h1>Talk To Me</h1>
      <div className="todo-input-wrapper">
        <input
          className="todo-input"
          type="text"
          placeholder="내용을 입력하세요"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></input>
        <div className="button-wrapper">
          <button onClick={handleAddClick}>
            <img
              className="add-image"
              src={process.env.PUBLIC_URL + `assets/add.png`}
              alt="addimage"
            />
          </button>
          <button
            onClick={() => {
              setMicOn(!micOn);
              toggleListening();
            }}
          >
            {listening ? (
              <img
                className="mic-image"
                src={process.env.PUBLIC_URL + `assets/onmic.png`}
                alt="micimage"
              />
            ) : (
              <img
                className="mic-image"
                src={process.env.PUBLIC_URL + `assets/offmic.png`}
                alt="micimage"
              />
            )}
          </button>
        </div>
      </div>
      <div className="todo-content">
        {list.map((item, index) => (
          <List
            item={item}
            key={index}
            handleDeleteClick={() => {
              handleDeleteClick(item);
            }}
            handleCheckClick={handleCheckClick}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(TodoList);
