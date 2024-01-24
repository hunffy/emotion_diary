import React, { useEffect, useState } from "react";

import List from "../components/list.js";

import Myheader from "../components/Myheader.js";
import MyButton from "../components/MyButton.js";
import { useNavigate } from "react-router-dom";

import useSpeechToText from "../functions/usespeechtotext.js";

function TodoList() {
  const { transcript, listening, toggleListening, resetTranscript } =
    useSpeechToText();
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
    console.log("inputvalue 는 :", inputValue);
    toggleListening(); // 음성인식 중지
    resetTranscript(); //transcript 초기화
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

  //마이크 클릭상태
  const micClickHandler = () => {
    //마이크가 켜져있을때 : 음성인식종료
    if (micOn) {
      toggleListening();
      //마이크가 꺼져있을때 : 마이크상태를 on으로 바꾸고 음성인식시작
    } else {
      setMicOn(true);
      toggleListening();
    }
  };

  useEffect(() => {
    //음성인식 종료되면 transcript값을 초기화하고 마이크상태변경
    if (!listening) {
      resetTranscript();
      setMicOn(false);
    }
  }, [listening, resetTranscript]);

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  //로컬스토리지

  //앱이 마운트 될 때 실행
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("list")) || [];
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
          <button
            onClick={() => {
              handleAddClick();
            }}
          >
            <img
              className="add-image"
              src={process.env.PUBLIC_URL + `assets/add.png`}
              alt="addimage"
            />
          </button>
          <button onClick={micClickHandler}>
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
