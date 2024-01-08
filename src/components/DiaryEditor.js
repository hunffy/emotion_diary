import React, { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Myheader from "./Myheader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const getStringDate = (e) => {
  //toISOString()으로 받아온 객체 : YYYY-MM-DDTHH:mm:ss.ssz형태로 나오는데 그걸 slice로 0~9까지만 return 즉 년,월,일까지만 return해준다.
  return e.toISOString().slice(0, 10);
};

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "최악",
  },
];

const DiaryEditor = () => {
  //날짜 상태관리
  const [date, setDate] = useState(getStringDate(new Date()));
  //감정 상태관리
  const [emotion, setEmotion] = useState(3);

  //일기내용 상태관리
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };
  const navigate = useNavigate();
  return (
    <div className="DiaryEditor">
      <Myheader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box_text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
